function DobValidate(executionContext){
   var formContext = executionContext.getFormContext();
   //executionContext.getFormContext()
   var DOB = formContext.getAttribute("new_DOB").getValue();
   var today = new Date();
   var validMinDate = new Date(
       today.getFullYear() - 18,
       today.getMonth(),
       today.getDate(),
       today.getHours(),
       today.getMinutes(),
   )
   var DobField = formContext.getControl("new_dob");
   if(DOB > validMinDate) {
     DobField.setNotification("Minimum Age Must Be 18 +", "DOB");
   }
   else
   {
    DobField.clearNotification("DOB");
   }
}