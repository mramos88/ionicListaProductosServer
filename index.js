var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));


var productos =[{
  "id": "1",
  "nombre": "Celular Pixel 4",
  "precio": 1500,
  "cantidad": 10,
  "imagen": "https://http2.mlstatic.com/google-pixel-4-64gb-negro-nuevo-caja-sellada-D_NQ_NP_863257-MLA40463778044_012020-F.webp" 
},
{
  "id": "2",
  "nombre": "Tablet A 8",
  "precio": 3000,
  "cantidad": 3,
  "imagen": "https://images.fravega.com/f100/34eb7e44fea937adf5efeb9fc0411c3f.jpg"
  
  
  },
  {
    "id": "3",
    "nombre": "TV HD 32pulgads ",
    "precio": 5600,
    "cantidad": 0,
    "imagen": "https://s3.amazonaws.com/gpcdn-dev/avenida/products/photos/5d/a4d/9c0e5e8a4ddd51b9092d5d743c6bcca5_l.png"
    
    
    },
  {
    "id": "5",
    "nombre": "Pc Armada Gamer Amd A8",
    "precio": 42000,
    "cantidad": 1,
    "imagen": "https://http2.mlstatic.com/pc-armada-gamer-amd-a8-9600-x10-nucleos-video-r7-hdmi-w10-64-D_NQ_NP_991108-MLA31036405418_062019-F.webp"
    
    
    },
  {
    "id": "6",
    "nombre": "Impresora A Color Multifunción Epson",
    "precio": 26999,
    "cantidad": 15,
    "imagen": "https://http2.mlstatic.com/impresora-a-color-multifuncion-epson-ecotank-l3110-110v220v-negra-D_NQ_NP_635401-MLA41557168334_042020-O.webp"
    
    
    },
  {
    "id": "7",
    "nombre": "Smart Tv Tcl 50p8m Led",
    "precio": 53000,
    "cantidad": 7,
    "imagen": "https://http2.mlstatic.com/smart-tv-tcl-50p8m-led-4k-50-D_NQ_NP_781845-MLA40740858737_022020-F.webp"
    
    
    },
  {
    "id": "8",
    "nombre": "Xiaomi Mi Band 5",
    "precio": 3999,
    "cantidad": 45,
    "imagen": "https://http2.mlstatic.com/xiaomi-mi-band-5-global-smart-watch-reloj-inteligente-film-D_NQ_NP_890465-MLA42960821090_072020-O.webp"
    
    
    }]



var id =20;


app.get("/productos",function(req,res){
   setTimeout(function(){
 res.send(productos);    

        return;
    },2000);
   
   
    
});
app.get("/loquesea",function(req,res){

	 res.send("respuesta");    


   
   
   
    
});

app.get("/productos/:id",function(req,res){
  console.log(req.params.id);
    if(req.params.id>0){
      var producto={};
       productos.forEach(item=>{
    
        if(item.id==req.params.id){
        
          producto= item;
         
        }
      });
      res.send(producto);
      return; 
     
    }else{
        res.send({'type': 'error'});
        return; 
    }
  
});




app.post("/login",function(req,res){
    setTimeout(function(){
        console.log("Llego al servidor "+JSON.stringify(req.body));
        
       
        if(req.body.email!=undefined && req.body.password!=undefined){
            if(req.body.email==="usuario"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'User'}")
                res.send({'type': 'User'});    
            }else if(req.body.email==="admin"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'Admin'}")
                res.send({'type': 'Admin'});    
            }else{
                console.log("Sale del servidor "+"{'type': 'error'}")
                res.send({'type': 'error'});
            }
            return;
        }
        console.log("Sale del servidor "+"{'type': 'error'}")
        res.send({'type': 'error'});
    },2000);
    
});


app.post("/productos",function(req,res){
  console.log(req.body);
    setTimeout(function(){
        if((req.body.nombre!= undefined&&req.body.nombre!= "") &&(req.body.precio!= undefined) 
			&&  (req.body.cantidad!= undefined) && (req.body.imagen!= undefined&&req.body.imagen!= "")){
     
			id = id +1;
       
			
			var data = {"id":id,"nombre":req.body.nombre,"precio":req.body.precio,"cantidad":req.body.cantidad,"imagen":req.body.imagen};
				productos.push(data);
                res.send(data);    
     
            return;
        }
        res.send({'type': 'error'});
    },2000);
    
});

app.put("/productos/:id",function(req,res){
  console.log(req.params.id);
    setTimeout(function(){
        
       console.log(req.body);

        if((req.body.nombre!= undefined&&req.body.nombre!= "") &&(req.body.imagen!= undefined&&req.body.imagen!= "") 
			&&  (req.body.precio!= undefined) && (req.body.cantidad!= undefined)){
	
			
        
				for(var i =0;i<productos.length;i++){
					if(req.params.id== productos[i].id){
            console.log("Atualiza")
						productos[i].nombre=req.body.nombre;
						productos[i].precio=req.body.precio;
						productos[i].cantidad=req.body.cantidad;
						productos[i].imagen=req.body.imagen;
							res.send(req.body);    
							return;
					}
				}
		
        }
        res.send({'type': 'error'});
    },2000);
    
});



app.delete("/productos/:id",function(req,res){
  console.log(req.params.id);
    setTimeout(function(){
        
       console.log(req.params.id);
        if(req.params.id!= undefined){
	
			for(var i =0;i<productos.length;i++){
					if(req.params.id== productos[i].id){
						productos.splice(i,1);
        	var data = {"type":"ok"};
							res.send(data);    
							return;
					}
				}
			
			

        }
        res.send({'type': 'error'});
    },2000);
    
});

app.listen(3000,function(){
    console.log("Api en el puerto 3000");
});