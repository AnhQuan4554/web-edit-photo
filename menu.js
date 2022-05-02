const iteam_icon = document.querySelectorAll('.iteam-icon');
const adjust_list = document.querySelectorAll('.adjust-list');
const display = document.querySelector('.display');
const tool_clicks =   document.querySelectorAll('.tool--click');
var image = document.querySelector('.display img')

//làm  hiệu ứng sổ xuống 
Array.from(iteam_icon).forEach((iteam)=>{

    iteam.onclick = (e)=>{
        e.preventDefault();
        const icon_down= iteam.querySelector('.bxs-chevron-down')
          iteam.classList.toggle('active')
          delete_tool()
    }
   
})


/////////////////////////
var adjust_links = document.querySelectorAll('.adjust-link')

adjust_links.forEach((adjust_link,index)=>{
    adjust_link.onclick = ()=>{
        //trước khi thêm thì xóa hết class trước 
            delete_tool()
            tool_clicks[index].classList.toggle('move');
         
        }
})

/* khi bâ ra màn hình  */
display.onclick = ()=>{
    tool_clicks.forEach((e)=>{
        e.classList.remove('move')
    })

}
//hàm xóa cấc tool-click
function delete_tool(){
    tool_clicks.forEach((e)=>{
        e.classList.remove('move')
    })
}
const app = {
     editImange: function(){
        document.querySelector('.brightness .bx-minus').onclick = function(){
            Caman("canvas", function() {
                this.brightness(-5).render();
              });
        }
        document.querySelector('.brightness .bx-plus').onclick = function(){
            Caman("canvas", function() {
                this.brightness(5).render();
              });
        }
        document.querySelector('.contrast .bx-minus').onclick = function(){
            Caman("canvas", function() {
                this.contrast(-5).render();
              });
        }
        document.querySelector('.contrast .bx-plus').onclick = function(){
            Caman("canvas", function() {
                this.contrast(5).render();
              });
        }
        document.querySelector('.saturation .bx-minus').onclick = function(){
            Caman("canvas", function() {
                this.saturation(-10).render();
              });
        }
        document.querySelector('.saturation .bx-plus').onclick = function(){
            Caman("canvas", function() {
                this.saturation(10).render();
              });
        }
        document.querySelector('.sepia .bx-minus').onclick = function(){
            Caman("canvas", function() {
                this.sepia(-5).render();
              });
        }
        document.querySelector('.sepia .bx-plus').onclick = function(){
            Caman("canvas", function() {
                this.sepia(5).render();
              });
        }
        document.querySelector('.blur .bx-minus').onclick = function(){
            Caman("canvas", function() {
                this.stackBlur(-5).render();
              });
        }
        document.querySelector('.blur .bx-plus').onclick = function(){
            Caman("canvas", function() {
                this.stackBlur(5).render();
              });
        }
     },
     drawImage : function(){
        var c = document.querySelector('canvas')
        console.log(c)
        var ctx = c.getContext("2d");
        var img = document.querySelector("img")
        // img.style.filter = "grayscale(100%)"
        ctx.drawImage(c,0,0)
        
        let check = false
        let x, y;
        
        let pos1 = {
            x:0,
            y:0
        }
        let pos2 = {
            x:0,
            y:0
        }
        c.addEventListener("mousedown",(e)=>{
           /*  x= e.offsetX
            y= e.offsetY */
            pos1.x= e.offsetX
            pos1.y= e.offsetY
            check = true
        })
        
        
        c.addEventListener("mousemove",(e)=>{
            
            if(check){
                ctx.beginPath()
                ctx.arc(pos1.x, pos1.y, size, 0, 2 * Math.PI);
                ctx.fillStyle = `${color}`
                ctx.fill();
                ctx.beginPath()
               pos2.x = e.offsetX
                pos2.y= e.offsetY
                ctx.moveTo(pos1.x, pos1.y);
                ctx.lineTo(pos2.x, pos2.y);
                ctx.strokeStyle= `${color}`
                ctx.lineWidth = size
                ctx.stroke();
                pos1.x= pos2.x
                pos1.y= pos2.y
        
            }
        })
        c.addEventListener("mouseup",(e)=>{
            check = false
        })
        
        // Caman('canvas', function () {
        //     this.render();
        //   });
          
        //save vẫn phải có nếu ko lỗi
        const save = document.querySelector(".save")
        // save.addEventListener('click',()=>{
        //     var output = canvas.toDataURL('image/png');
        //     console.log(save)
        //     console.log( output)
        
        //     save.setAttribute('href',output)
        // })
        /////////////chỉnh sửa kích thước size 
        var size = 6;
        var color = 'yellow';

        const colorAfter = document.querySelector('#changeColor');
        colorAfter.onchange = (e)=>{
           console.log(e.target.value);
           color = e.target.value
       }
       ////change size
       const increaseSize = document.querySelector(".wrapBtnsizein");
       const decreaseSize = document.querySelector(".wrapBtnsizede");
       const earse = document.querySelector(".earse ");
       increaseSize.onclick = ()=>{
           size+=5;
           size = size<30?size:30;
       }
       decreaseSize.onclick = ()=>{
        size-=5;
        size = size>6?size:6;
    }
    earse.onclick = ()=>{
        color = '#fff'
    }
      

        /////tay




     },
/////////////////////////////Upload
     uploadCanvas : function(){
         var _this = this;
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        let fileName = "";

        const uploadFile = document.getElementById("upload-file");
        console.log('uploa',uploadFile)
        // Upload File
        uploadFile.addEventListener("change", () => {
        // Get File
        const file = document.getElementById("upload-file").files[0];
        // Init FileReader API
        const reader = new FileReader();
        // Check for file
        if (file) {
            // Set file name
            fileName = file.name;
            // Read data as URL
            reader.readAsDataURL(file);
            //// lập tức xóa cái dấu cộng 
            var plusCan = document.querySelector('.bx-plus-circle.dis')
            document.querySelector('.bx-plus-circle.dis').style.display = "none"
            console.log(plusCan);
           _this.drawImage();
            
        }

        // Add image to canvas
        reader.addEventListener(
            "load",
            () => {
            // Create image
            img = new Image();
            // Set image src
            img.src = reader.result;
            // On image load add to canvas
            img.onload = function() {
                canvas.width = 991;
                canvas.height = 568;
                ctx.drawImage(img, 0, 0,991,568);
                canvas.removeAttribute("data-caman-id");
                Caman('canvas', function () {
                    this.render();
                });
                
            };
            
        
            },
            false
        );
        });
},
    
     saveCanvas: function(){
         //save
         var canvas = document.querySelector('canvas')
         const save = document.querySelector(".save")
         save.addEventListener('click',()=>{
             var output = canvas.toDataURL('image/png');
             console.log(save)
             console.log( output)
 
             save.setAttribute('href',output)
             location.reload(true);
 
         })
    },
   
     start: function(){
         var _this = this;
         this.editImange();
         this.uploadCanvas();
         
        // this.drawImage();
         this.saveCanvas();
     }
}
app.start();
//////////////////////Chỉnh sửa 



//////////////cái này thì bấm vào hiện luôn 
//ul có sẵn 


document.querySelector('.adjust-link--default.greyscale').onclick = function(){
    Caman("canvas", function() {
        this.greyscale().render();
      });
}

const hadleFIlter_click = {
    icon : function(){
        var _this= this;
        const adjust_link_defaults = document.querySelectorAll('.adjust-link--default')
        
        Array.from(adjust_link_defaults).forEach((adjust_link)=>{
        adjust_link.onclick = ()=>{
        //     var x = document.querySelector('.adjust-link--default.active');
        //    if(x){
        //     x.classList.remove('active')
        //    }
   
            adjust_link.classList.add('active');
            if(adjust_link.classList.contains('invert')){
                this.invert();
            }
            if(adjust_link.classList.contains('greyscale')){
                this.greyscale();
            }
            if(adjust_link.classList.contains('vintage')){
                this.invert();
            }
            if(adjust_link.classList.contains('nostalgia')){
                this.nostalgia();
            }
            if(adjust_link.classList.contains('orangePeel')){
                this.orangePeel();
            }
            if(adjust_link.classList.contains('lomo')){
                this.lomo();
            }
          
        }
       
        })
    },
    greyscale : function(){
        Caman("canvas", function() {
            this.greyscale().render();
          });
    },
    invert : function(){
        Caman("canvas", function() {
            this.invert().render();
          });
    },
    vintage : function(){
        Caman("canvas", function() {
            this.vintage().render();
          });
    },
  
    nostalgia : function(){
        Caman("canvas", function() {
            this.nostalgia().render();
          });
    },
    orangePeel : function(){
        Caman("canvas", function() {
            this.orangePeel().render();
          });
    },
    lomo : function(){
        Caman("canvas", function() {
            this.lomo().render();
          });
    },
    revert : function(){
        Caman("canvas", function() {
            this.revert();
          });
      
    },
    reseatFilter: function(){
        var _this = this;
        const reset = document.querySelector('.resetFilter')
        reset.onclick = (e)=>{
            e.preventDefault();
            _this.revert();
            ////xoa dấu tích filter có sẵn
            var adjust_links = document.querySelectorAll('.adjust-link--default.active')
            adjust_links.forEach((item)=>{
                item.classList.remove('active');
            })
        }
    },
    start: function(){
        this.icon();
        this.reseatFilter();
    },
}
hadleFIlter_click.start()


//////////draw
