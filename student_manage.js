const btn = document.querySelector("button")
// console.log(btn);
var cnt = 0;
btn.addEventListener("click",function(event){
    event.preventDefault();
    cnt += 1;
    console.log(cnt);
    const studentDetails = {
     name:document.getElementById("name").value,
     phone:document.getElementById("phone").value,
     address:document.getElementById("address").value
    }
    axios
      .post(
        "https://crudcrud.com/api/c98f3933b8be4d0296bbfc0d28d2f193/studentData",
        studentDetails
      )
      .then((response) => 
        {
            // const head = document.querySelector("#head");
            // const para = document.createElement('p');
            // para.appendChild(document.createTextNode(`All Students:${cnt}`));
            // head.appendChild(para);
            const para = document.querySelector("p");
            para.textContent = `All Students:${cnt}`;
            displayUserOnScreen(response.data)
            console.log(response);
        })
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
})
window.addEventListener("DOMContentLoaded",()=>{
    axios
    .get(
        "https://crudcrud.com/api/c98f3933b8be4d0296bbfc0d28d2f193/studentData")
    .then((response) => {
        console.log("response");
        // displayUserOnScreen(response.data)
        const para = document.querySelector("p");
        cnt = response.data.length;
        para.textContent = `All Students:${response.data.length}`;
        for(let i = 0;i < response.data.length;i++){
            displayUserOnScreen(response.data[i]);
        }
        
    })
    .catch((error) => console.log(error)); 
})
   
  
function displayUserOnScreen(userDetails) {
const userItem = document.createElement("p");
userItem.appendChild(
    document.createTextNode(
    `${userDetails.name} - ${userDetails.phone} - ${userDetails.address}`
    )
);

const deleteBtn = document.createElement("button");
// deleteBtn.id = userDetails._id;
deleteBtn.appendChild(document.createTextNode("Delete"));
userItem.appendChild(deleteBtn);

const editBtn = document.createElement("button");
editBtn.appendChild(document.createTextNode("Edit"));
userItem.appendChild(editBtn);

const userList = document.querySelector("#Allstnt");
userList.appendChild(userItem);
deleteBtn.addEventListener("click", function (event) {
  axios.delete(`https://crudcrud.com/api/c98f3933b8be4d0296bbfc0d28d2f193/studentData/${userDetails._id}`);
  const para = document.querySelector("p");
  cnt -= 1;
  para.textContent = `All Students:${cnt}`
  userList.removeChild(event.target.parentElement);
//   localStorage.removeItem(userDetails.email);
});
editBtn.addEventListener("click", function (event) {
  userList.removeChild(event.target.parentElement);
//   localStorage.removeItem(userDetails.email);
  axios.delete(`https://crudcrud.com/api/c98f3933b8be4d0296bbfc0d28d2f193/studentData/${userDetails._id}`);
  const para = document.querySelector("p");
  cnt -= 1;
  para.textContent = `All Students:${cnt}`
  document.getElementById("name").value = userDetails.name;
  document.getElementById("phone").value = userDetails.phone;
  document.getElementById("address").value = userDetails.address;
});


}
