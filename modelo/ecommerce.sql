
DROP SCHEMA IF EXISTS ecomm_obj CASCADE;


CREATE SCHEMA IF NOT EXISTS ecomm_obj
    AUTHORIZATION jose;

/*==============================================================*/
/* Table: login_history                                         */
/*==============================================================*/
create table "ecomm_obj"."login_history" (
   id_login             	SERIAL not NULL,
   id_usuario           	INTEGER              NULL,
   fecha_login          	DATE                 NULL,
   activo 					BOOLEAN 	NOT NULL DEFAULT true,   
   usuario_creacion 		VARCHAR(25) NOT NULL DEFAULT ' ',
   fecha_creacion 			DATE 		NOT NULL DEFAULT CURRENT_TIMESTAMP,
   terminal_creacion 		VARCHAR(30) NOT NULL DEFAULT ' ',
   usuario_modificacion 	VARCHAR(25) ,
   fecha_modificacion 		DATE,
   terminal_modificacion 	VARCHAR(30) ,      
   usuario_eliminacion 		VARCHAR(25) ,
   fecha_eliminacion 		DATE,
   terminal_eliminacion 	VARCHAR(30) ,   
   constraint PK_login_history primary key (id_login)
);

ALTER TABLE IF EXISTS "ecomm_obj"."login_history"
    OWNER to jose;


/*==============================================================*/
/* Table: producto                                              */
/*==============================================================*/
create table "ecomm_obj"."producto" (
   id_producto          	SERIAL not 		NULL,
   nom_producto         	VARCHAR(30)     NULL,
   descripcion          	VARCHAR(100)    NULL,
   imgUrl					VARCHAR(500)    NULL,
   precio               	NUMERIC         NULL,
   is_oferta            	BOOLEAN         NULL,
   porcentaje_oferta    	NUMERIC         NULL,
   precio_final         	NUMERIC         NULL,
   activo 					BOOLEAN 	NOT NULL DEFAULT true,   
   usuario_creacion 		VARCHAR(25) NOT NULL DEFAULT ' ',
   fecha_creacion 			DATE 		NOT NULL DEFAULT CURRENT_TIMESTAMP,
   terminal_creacion 		VARCHAR(30) NOT NULL DEFAULT ' ',
   usuario_modificacion 	VARCHAR(25) ,
   fecha_modificacion 		DATE,
   terminal_modificacion 	VARCHAR(30) ,      
   usuario_eliminacion 		VARCHAR(25) ,
   fecha_eliminacion 		DATE,
   terminal_eliminacion 	VARCHAR(30) ,  
   constraint pk_producto primary key (id_producto)
);

-- set table ownership
ALTER TABLE IF EXISTS "ecomm_obj"."producto"
    OWNER to jose;

/*==============================================================*/
/* Table: usuario                                               */
/*==============================================================*/
create table "ecomm_obj"."usuario" (
   id_usuario           	SERIAL not NULL,
   nom_persona          	VARCHAR(150)         NULL,
   username             	VARCHAR(25)          NULL,
   password             	VARCHAR(10)          NULL,
   rol                  	VARCHAR(15)          NULL,
   activo 					BOOLEAN 	NOT NULL DEFAULT true,   
   usuario_creacion 		VARCHAR(25) NOT NULL DEFAULT ' ',
   fecha_creacion 			DATE 		NOT NULL DEFAULT CURRENT_TIMESTAMP,
   terminal_creacion 		VARCHAR(30) NOT NULL DEFAULT ' ',
   usuario_modificacion 	VARCHAR(25) ,
   fecha_modificacion 		DATE,
   terminal_modificacion 	VARCHAR(30) ,      
   usuario_eliminacion 		VARCHAR(25) ,
   fecha_eliminacion 		DATE,
   terminal_eliminacion 	VARCHAR(30) ,  
   constraint pk_usuario primary key (id_usuario)
);

-- set table ownership
ALTER TABLE IF EXISTS "ecomm_obj"."usuario"
    OWNER to jose;
/*==============================================================*/
/* Table: venta                                                 */
/*==============================================================*/
create table "ecomm_obj"."venta" (
   id_venta             	SERIAL not NULL,
   id_usuario           	INTEGER              NULL,
   monto_venta          	NUMERIC              NULL,
   fecha_venta          	DATE                 NULL,
   observacion          	VARCHAR(100)         NULL,
   activo 					BOOLEAN 	NOT NULL DEFAULT true,   
   usuario_creacion 		VARCHAR(25) NOT NULL DEFAULT ' ',
   fecha_creacion 			DATE 		NOT NULL DEFAULT CURRENT_TIMESTAMP,
   terminal_creacion 		VARCHAR(30) NOT NULL DEFAULT ' ',
   usuario_modificacion 	VARCHAR(25) ,
   fecha_modificacion 		DATE,
   terminal_modificacion 	VARCHAR(30) ,      
   usuario_eliminacion 		VARCHAR(25) ,
   fecha_eliminacion 		DATE,
   terminal_eliminacion 	VARCHAR(30) ,  
   constraint pk_venta primary key (id_venta)
);

-- set table ownership
ALTER TABLE IF EXISTS "ecomm_obj"."venta"
    OWNER to jose;

alter table "ecomm_obj"."login_history"
   add constraint "fk_login_usuario" foreign key (id_usuario)
      references "ecomm_obj"."usuario" (id_usuario)
      on delete restrict on update restrict;

alter table "ecomm_obj"."venta"
   add constraint "fk_venta_usuario" foreign key (id_usuario)
      references "ecomm_obj"."usuario" (id_usuario)
      on delete restrict on update restrict;

/*==============================================================*/
/* Table: DET_VENTA                                             */
/*==============================================================*/
create table "ecomm_obj"."det_venta" (
   id_venta             	INTEGER              not null,
   item                 	INTEGER              not null,
   id_producto          	INTEGER              not null,
   precio               	NUMERIC              not null,
   porcentaje_oferta    	NUMERIC              not null,
   precio_final         	NUMERIC              not null,
   activo 					BOOLEAN 	NOT NULL DEFAULT true,   
   usuario_creacion 		VARCHAR(25) NOT NULL DEFAULT ' ',
   fecha_creacion 			DATE 		NOT NULL DEFAULT CURRENT_TIMESTAMP,
   terminal_creacion 		VARCHAR(30) NOT NULL DEFAULT ' ',
   usuario_modificacion 	VARCHAR(25) ,
   fecha_modificacion 		DATE,
   terminal_modificacion 	VARCHAR(30) ,      
   usuario_eliminacion 		VARCHAR(25) ,
   fecha_eliminacion 		DATE,
   terminal_eliminacion 	VARCHAR(30) ,  
   constraint pk_detventa primary key (id_venta, item)
);

ALTER TABLE IF EXISTS "ecomm_obj"."det_venta" 
    OWNER to jose;

alter table "ecomm_obj"."det_venta" 
   add constraint fk_detventa_producto foreign key (id_producto)
      references "ecomm_obj"."producto"  (id_producto)
      on delete restrict on update restrict;

alter table "ecomm_obj"."det_venta" 
   add constraint fk_detventa_venta foreign key (id_venta)
      references "ecomm_obj"."venta" (id_venta)
      on delete restrict on update restrict;