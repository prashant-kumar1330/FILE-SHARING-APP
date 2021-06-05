
const dropZone = document.querySelector(".drop-zone");
const browsebtn= document.querySelector(".browsebtn");
const fileinput = document.querySelector("#input-file");
const bgprogress = document.querySelector(".bg-progress");
const percentContainer = document.querySelector(".percent-container");
const progressbar= document.querySelector(".progress-bar")
const progressContainer = document.querySelector(".progress-container");
const fileurl= document.querySelector("#fileurl");
const sharingContainer = document.querySelector(".sharing-container");
const copybtn= document.querySelector(".iconify");
dropZone.addEventListener("dragover",(e)=>{
    e.preventDefault();
    if(!dropZone.classList.contains("dragged")){
        dropZone.classList.add("dragged")
    }
    
})
 const host= "https://innshare.herokuapp.com/"
 const uploadURL= `${host}api/file`;



dropZone.addEventListener("dragleave" ,()=>{
   dropZone.classList.remove("dragged");
})
dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged");
    const files= e.dataTransfer.files;
    console.log(files);
    if(e.dataTransfer.files.length){
        fileinput.files=files;
        uploadfile();
    }
})

fileinput.addEventListener("change",()=>{
    uploadfile();
})
browsebtn.addEventListener("click",()=>{
   fileinput.click(); 
})
const uploadfile = ()=>{
    progressContainer.style.display= "block";
    const file= fileinput.files[0];
    const formData = new FormData();
    formData.append("myfiles",file)
    const xhr= new XMLHttpRequest();
    xhr.onreadystatechange =()=>{
     if(xhr.readyState==XMLHttpRequest.DONE){
         console.log(xhr.response)
         showlink(JSON.parse(xhr.response))
     }

    };
    xhr.upload.onprogress= updateProgress;
    xhr.open("POST",uploadURL);
    xhr.send(formData);
    
}
// add upload progress video time 1hr

const updateProgress = (e)=>{
    const percent = Math.round((e.loaded/e.total)*100);
    console.log(percent);
    bgprogress.getElementsByClassName.width= `${percent} %`;
    percent.innerText=percent;
    progressbar.getElementsByClassName.transform= `scaleX(${precent/100})`
}

// const showlink= (file: //url)=>{
//     console.log()
//     progressContainer.style.display="none";
//     sharingContainer.style.display="block";
//     fileurl.value=url;
// }
copybtn.addEventListener("click",()=>{
    fileurl.select();
    document.execCommand("copy");
})
