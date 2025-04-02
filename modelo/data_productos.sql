-- Insertar 10 productos en la tabla producto con imágenes reales de MercadoLibre y otras páginas
INSERT INTO "ecomm_obj"."producto" 
(nom_producto, descripcion, imgUrl, precio, is_oferta, porcentaje_oferta, precio_final, activo, usuario_creacion, terminal_creacion)
VALUES
-- Producto 1: Smartphone
('iPhone 13', 'iPhone 13 128GB Azul, pantalla Super Retina XDR de 6.1"', 'https://http2.mlstatic.com/D_NQ_NP_736168-MLA47781742030_102021-O.webp', 999.99, true, 15, 849.99, true, 'admin', 'PC-01'),

-- Producto 2: Laptop
('MacBook Air M1', 'MacBook Air Chip M1 13" 256GB SSD 8GB RAM', 'https://http2.mlstatic.com/D_NQ_NP_801112-MLA46516512347_062021-O.webp', 1099.00, false, NULL, 1099.00, true, 'admin', 'PC-01'),

-- Producto 3: Auriculares
('Sony WH-1000XM4', 'Audífonos inalámbricos con cancelación de ruido', 'https://http2.mlstatic.com/D_NQ_NP_647181-MLU73119534126_122023-O.webp', 349.99, true, 20, 279.99, true, 'admin', 'PC-01'),

-- Producto 4: Smartwatch
('Apple Watch Series 7', 'Reloj inteligente GPS 45mm Correa Deportiva', 'https://http2.mlstatic.com/D_NQ_NP_961488-MLA79316980909_092024-O.webp', 399.00, false, NULL, 399.00, true, 'admin', 'PC-01'),

-- Producto 5: Televisor
('LG OLED C1', 'TV LG OLED 55" 4K UHD Smart TV AI ThinQ', 'https://http2.mlstatic.com/D_NQ_NP_976111-MLA52960277043_122022-O.webp', 1299.99, true, 10, 1169.99, true, 'admin', 'PC-01'),

-- Producto 6: Consola de juegos
('PlayStation 5', 'Consola PlayStation 5 Standard 825GB', 'https://http2.mlstatic.com/D_NQ_NP_841132-MLU77796368248_072024-O.webp', 499.99, false, NULL, 499.99, true, 'admin', 'PC-01'),

-- Producto 7: Cámara
('Canon EOS R6', 'Cámara Mirrorless Canon EOS R6 Cuerpo', 'https://http2.mlstatic.com/D_NQ_NP_660394-MPE78711545731_082024-O.webp', 2399.00, true, 12, 2111.12, true, 'admin', 'PC-01'),

-- Producto 8: Altavoz inteligente
('Echo Dot 4ta Gen', 'Altavoz inteligente con Alexa - Negro', 'https://http2.mlstatic.com/D_NQ_NP_893503-MLU78251411665_082024-O.webp', 49.99, true, 30, 34.99, true, 'admin', 'PC-01'),

-- Producto 9: Tablet
('iPad Air 2022', 'Tablet iPad Air 10.9" 64GB WiFi 5ta Generación', 'https://http2.mlstatic.com/D_NQ_NP_674627-MLU69495913879_052023-O.webp', 599.00, false, NULL, 599.00, true, 'admin', 'PC-01'),

-- Producto 10: Drone
('DJI Mavic Air 2', 'Drone DJI Mavic Air 2 Fly More Combo', 'https://http2.mlstatic.com/D_NQ_NP_874572-MCO49909762735_052022-O.webp', 999.00, true, 15, 849.15, true, 'admin', 'PC-01');

