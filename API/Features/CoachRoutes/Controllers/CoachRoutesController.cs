﻿using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.CoachRoutes {

    [Route("api/[controller]")]
    public class CoachRoutesController : ControllerBase {

        #region variables

        private readonly ICoachRouteRepository coachRouteRepo;
        private readonly ICoachRouteValidation coachRouteValidation;
        private readonly IMapper mapper;

        #endregion

        public CoachRoutesController(ICoachRouteRepository coachRouteRepo, ICoachRouteValidation coachRouteValidation, IMapper mapper) {
            this.coachRouteRepo = coachRouteRepo;
            this.coachRouteValidation = coachRouteValidation;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<CoachRouteListVM>> GetAsync() {
            return await coachRouteRepo.GetAsync();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "user, admin")]
        public async Task<IEnumerable<CoachRouteAutoCompleteVM>> GetAutoCompleteAsync() {
            return await coachRouteRepo.GetAutoCompleteAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(int id) {
            var x = await coachRouteRepo.GetById(id, true);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<CoachRoute, CoachRouteReadDto>(x)
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public Response Post([FromBody] CoachRouteWriteDto coachRoute) {
            var x = coachRouteValidation.IsValid(coachRoute);
            if (x == 200) {
                var z = coachRouteRepo.Create(mapper.Map<CoachRouteWriteDto, CoachRoute>((CoachRouteWriteDto)coachRouteRepo.AttachUserIdToDto(null, null, coachRoute)));
                return new Response {
                    Code = 200,
                    Id = z.Id.ToString(),
                    Icon = Icons.Success.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = x
                };
            }
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> Put([FromBody] CoachRouteWriteDto coachRoute) {
            var x = await coachRouteRepo.GetById(coachRoute.Id, false);
            if (x != null) {
                var z = coachRouteValidation.IsValid(coachRoute);
                if (z == 200) {
                    coachRoute.PutUserId = x.User.Id;
                    coachRouteRepo.Update(mapper.Map<CoachRouteWriteDto, CoachRoute>(coachRoute));
                    return new Response {
                        Code = 200,
                        Id = x.Id.ToString(),
                        Icon = Icons.Success.ToString(),
                        Message = ApiMessages.OK()
                    };
                } else {
                    throw new CustomException() {
                        ResponseCode = z
                    };
                }
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<Response> Delete([FromRoute] int id) {
            var x = await coachRouteRepo.GetById(id, false);
            if (x != null) {
                coachRouteRepo.Delete(x);
                return new Response {
                    Code = 200,
                    Id = x.Id.ToString(),
                    Icon = Icons.Success.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

    }

}