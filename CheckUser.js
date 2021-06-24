//checkAccountIdWebResource
function checkAccountId(){
    var req = new XMLHttpRequest();
    var btn;
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/accounts?$select=accountid,accountnumber,accountratingcode,fax", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function() {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var results = JSON.parse(this.response);
                for (var i = 0; i < results.value.length; i++) {
                    var accountid = results.value[i]["accountid"];
                    alert(accountid)
                    if(accountid=="93c71621-bd9f-e711-8122-000d3a2ba2ea"){
                        
                        alert(true);
                        btn=true;
                    }
                    else
                    {   
                        alert(false);
                        btn=false;
                    }
        }
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    return btn;
}