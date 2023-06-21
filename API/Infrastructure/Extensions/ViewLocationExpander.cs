using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Razor;

namespace API.Infrastructure.Extensions {

    public class ViewLocationExpander : IViewLocationExpander {

        public IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context, IEnumerable<string> viewLocations) =>
              new List<string> {
                  "/Infrastructure/Views/{0}.cshtml"
              };

        public void PopulateValues(ViewLocationExpanderContext context) { }

    }

}