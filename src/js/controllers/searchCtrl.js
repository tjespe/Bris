app.controller('searchController', ['$http', '$scope', '$q', '$sce', '$httpx', function($http, $scope, $q, $sce, $httpx) {
  var vm = this;
  vm.query = "";
  vm.matches = [];
  vm.error = false;
  vm.loading = false;

  vm.search = function () {
    vm.loading = true;
    let get_params = "?input="+encodeURIComponent(vm.query);
    $httpx.get("https://real-timer-server.tk:2087/place-search.php"+get_params, {lifetime: Infinity, alt_urls: ["https://script.google.com/macros/s/AKfycby5ASPEN1ESxoUZru80yqRXBNVm4C5MkDcHL5asJs3KADFW1huc/exec"+get_params, "https://bris-cdn.cf/place-search.php"+get_params]}).then((data)=>{
      vm.matches = data.predictions;
      vm.loading = false;
      for (let i = 0;i < vm.matches.length;i++) {
        let country = vm.matches[i].terms[vm.matches[i].terms.length - 1].value;
        let exceptions = { "Åland Islands": "ala","Algeria": "dza","American Samoa": "asm","Angola": "ago","Anguilla": "aia","Antarctica": "ata","Antigua and Barbuda": "atg","Aruba": "abw","Austria": "aut","The Bahamas": "bhs","Bahamas": "bhs","Bahrain": "bhr","Bangladesh": "bgd","Barbados": "brb","Belarus": "blr","Belize": "blz","Bermuda": "bmu","Bhutan": "btn","Bonaire, Sint Eustatius and Saba": "bes","Bosnia and Herzegovina": "bih","Botswana": "bwa","Bouvet Island": "bvt","British Indian Ocean Territory": "iot","United States Minor Outlying Islands": "umi","Virgin Islands (British)": "vgb","Brunei Darussalam": "brn","Bulgaria": "bgr","Burkina Faso": "bfa","Burundi": "bdi","Cambodia": "khm","Cameroon": "cmr","Cabo Verde": "cpv","Cayman Islands": "cym","Central African Republic": "caf","Chad": "tcd","Chile": "chl","China": "chn","Christmas Island": "cxr","Cocos (Keeling) Islands": "cck","Congo": "cog","Democratic Republic of the Congo": "cod","Cook Islands": "cok","Costa Rica": "cri","Croatia": "hrv","Curaçao": "cuw","Denmark": "dnk","Dominica": "dma","El Salvador": "slv","Equatorial Guinea": "gnq","Falkland Islands (Malvinas)": "flk","Faroe Islands": "fro","Fiji": "fji","French Guiana": "guf","French Polynesia": "pyf","French Southern Territories": "atf","Gambia": "gmb","Germany": "deu","Greece": "grc","Greenland": "grl","Grenada": "grd","Guadeloupe": "glp","Guam": "gum","Guatemala": "gtm","Guernsey": "ggy","Guinea": "gin","Guinea-Bissau": "gnb","Haiti": "hti","Heard Island and McDonald Islands": "hmd","Holy See": "vat","Honduras": "hnd","Hong Kong": "hkg","Iceland": "isl","Indonesia": "idn","Côte d'Ivoire": "civ","Iran": "irn","Iraq": "irq","Ireland": "irl","Isle of Man": "imn","Japan": "jpn","Jersey": "jey","Kuwait": "kwt","Kyrgyzstan": "kgz","Latvia": "lva","Lebanon": "lbn","Lesotho": "lso","Liberia": "lbr","Libya": "lby","Lithuania": "ltu","Macedonia (FYROM)": "mkd","Madagascar": "mdg","Malawi": "mwi","Malaysia": "mys","Maldives": "mdv","Mali": "mli","Malta": "mlt","Marshall Islands": "mhl","Martinique": "mtq","Mauritania": "mrt","Mauritius": "mus","Mayotte": "myt","Micronesia": "fsm","Moldova": "mda","Monaco": "mco","Mongolia": "mng","Montenegro": "mne","Montserrat": "msr","Morocco": "mar","Myanmar": "mmr","Nauru": "nru","Nepal": "npl","Netherlands": "nld","New Caledonia": "ncl","New Zealand": "nzl","Niger": "ner","Nigeria": "nga","Norfolk Island": "nfk","North Korea": "prk","Northern Mariana Islands": "mnp","Oman": "omn","Palau": "plw","Palestine": "pse","Papua New Guinea": "png","Paraguay": "pry","Philippines": "phl","Pitcairn": "pcn","Portugal": "prt","Puerto Rico": "pri","Republic of Kosovo": "kos","Réunion": "reu","Romania": "rou","Saint Barthélemy": "blm","Saint Helena, Ascension and Tristan da Cunha": "shn","Saint Kitts and Nevis": "kna","Saint Lucia": "lca","Saint Martin (French part)": "maf","Saint Pierre and Miquelon": "spm","Saint Vincent and the Grenadines": "vct","Samoa": "wsm","San Marino": "smr","Sao Tome and Principe": "stp","Serbia": "srb","Seychelles": "syc","Sierra Leone": "sle","Singapore": "sgp","Sint Maarten (Dutch part)": "sxm","Slovakia": "svk","Slovenia": "svn","Solomon Islands": "slb","South Africa": "zaf","South Georgia and the South Sandwich Islands": "sgs","South Sudan": "ssd","Spain": "esp","Sri Lanka": "lka","Sudan": "sdn","Svalbard and Jan Mayen": "sjm","Swaziland": "swz","Switzerland": "che","Taiwan": "twn","Tajikistan": "tjk","Tanzania": "tza","Timor-Leste": "tls","Togo": "tgo","Tokelau": "tkl","Trinidad and Tobago": "tto","Turkmenistan": "tkm","Turks and Caicos Islands": "tca","United Arab Emirates": "are","United Kingdom": "gbr","United States": "usa","Uruguay": "ury","Vanuatu": "vut","Viet Nam": "vnm","Wallis and Futuna": "wlf","Western Sahara": "esh","Zambia": "zmb","Zimbabwe": "zwe" };
        if (country in exceptions) country = exceptions[country];
        vm.matches[i].country = country.substr(0,3).toLowerCase();
      }
    });
  }
}]);
