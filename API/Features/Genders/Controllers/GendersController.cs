﻿using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Genders {

    [Route("api/[controller]")]
    public class GendersController : ControllerBase {

        #region variables

        private readonly IGenderRepository genderRepo;
        private readonly IMapper mapper;

        #endregion

        public GendersController(IGenderRepository genderRepo, IMapper mapper) {
            this.mapper = mapper;
            this.genderRepo = genderRepo;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<GenderListVM>> GetAsync() {
            return await genderRepo.GetAsync();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "user, admin")]
        public async Task<IEnumerable<GenderAutoCompleteVM>> GetAutoCompleteAsync() {
            return await genderRepo.GetAutoCompleteAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(int id) {
            var x = await genderRepo.GetByIdAsync(id);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<Gender, GenderReadDto>(x)
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
        public Response Post([FromBody] GenderWriteDto gender) {
            var x = genderRepo.Create(mapper.Map<GenderWriteDto, Gender>((GenderWriteDto)genderRepo.AttachUserIdToDto(null, null, gender)));
            return new Response {
                Code = 200,
                Id = x.Id.ToString(),
                Icon = Icons.Success.ToString(),
                Message = ApiMessages.OK()
            };
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> Put([FromBody] GenderWriteDto gender) {
            var x = await genderRepo.GetByIdAsync(gender.Id);
            if (x != null) {
                gender.PutUserId = x.User.Id;
                genderRepo.Update(mapper.Map<GenderWriteDto, Gender>(gender));
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

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<Response> Delete([FromRoute] int id) {
            var x = await genderRepo.GetByIdAsync(id);
            if (x != null) {
                genderRepo.Delete(x);
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