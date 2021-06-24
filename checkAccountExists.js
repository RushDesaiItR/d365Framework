function checkParentContact(executionContext) {
    var Xrm = parent.Xrm;
    var formContext = executionContext.getFormContext();
    var id = Xrm.Page.data.entity.getId().toLowerCase();
    alert(id)
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/accounts("+id+")?$select=_primarycontactid_value", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
               
                var result = JSON.parse(this.response);
                var _primarycontactid_value = result["_primarycontactid_value"];
                var _primarycontactid_value_formatted = result["_primarycontactid_value@OData.Community.Display.V1.FormattedValue"];
                var _primarycontactid_value_lookuplogicalname = result["_primarycontactid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                alert(_primarycontactid_value, _primarycontactid_value_formatted,_primarycontactid_value_lookuplogicalname)
            } else {
                Xrm.Utility.alertDialog("Error",this.statusText);
            }
        }
    };
    req.send();

}