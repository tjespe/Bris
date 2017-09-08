/* This service is an extension of the native AngularJS $http service  *
 *
 * This service provides more functionality, and serves the resource from localStorage if the server is unavailable
 *
 * The `get` method takes normal $http options, but also some more:
 * options.lifetime can be used to specify how many milliseconds the cached resource is valid
 * options.alt_urls can be used to specify alternative urls for the resource
 */
app.service('$httpx', ['$http', '$q', function($http, $q) {
  let vm = angular.extend({}, $http);
  vm.get = (url, options)=>{
    let resolved = false;
    let errors = 0;
    // Create a defer object which contains a promise
    let deferred = $q.defer();
    // Create options object if it does not already exist, and add necessary fields
    if (typeof options === "undefined") options = {};
    if (!("lifetime" in options)) options.lifetime = 0;
    // Create an array of urls
    if (typeof options.alt_urls === "string") options.alt_urls = [options.alt_urls];
    let urls = typeof options.alt_urls === "undefined" ? [url] : (options.alt_urls.push(url) && options.alt_urls);
    // Honor timeout if specified in options object
    let alt_timeout = options.timeout;
    if (typeof alt_timeout === "number") {
      $timeout(()=>deferred.reject("TIMED OUT"), alt_timeout);
    } else if (typeof alt_timeout !== "undefined") {
      alt_timeout.catch(()=>deferred.reject("CANCELLED"));
    }
    // Use main promise as options.timeout so that no unnecessary data is loaded
    options.timeout = deferred.promise;
    // Loop through urls and make requests
    for (let i = 0;i < urls.length;i++) {
      // If valid data is stored in localStorage, resolve the request using that data
      if (typeof Storage !== "undefined" && urls[i] in localStorage && Number(localStorage[urls[i]+"_expiry"]) > Date.now()) {
        deferred.resolve(JSON.parse(localStorage[urls[i]]));
        resolved = true;
      }
      // Else, make request to server
      else {
        $http.get(urls[i], options).then(function successCallback(response) {
          // Resolve promise with data from request
          if (!resolved) deferred.resolve(response.data);
          resolved = true;
          // Save new data to localStorage
          if (typeof Storage !== "undefined") {
            localStorage[urls[i]] = JSON.stringify(response.data);
            localStorage[urls[i]+"_expiry"] = Number(options.lifetime) + Date.now();
          }
        }).then(function errorCallback(response) {
          // Count error
          errors++;
          // If the request has not been resolved and all URL requests have failed, try to find data in localStorage even if it is not valid
          if (!resolved && errors === urls.length) {
            // Loop through urls to search for localStorage data
            for (var j = 0; j < urls.length; j++) {
              if (typeof Storage !== "undefined" && urls[j] in localStorage) {
                deferred.resolve(localStorage[urls[i]]);
                resolved = true;
              }
            }
            // If no data was found, break the promise
            if (!resolved) deferred.reject("ERROR");
          }
        });
      }
    }
    return deferred.promise;
  };
  return vm;
}]);
