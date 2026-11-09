# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB, MongoDB |
| `client` | `client/` | chapter, support | client | React | - |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB, MongoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`
  - `GET /products`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.createProduct`: Se invoca `createProduct` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.getProduct`: Se invoca `getProduct` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.updateProduct`: Se invoca `updateProduct` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.deleteProduct`: Se invoca `deleteProduct` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.listProducts`: Se invoca `listProducts` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/App.tsx` — `ErrorBoundaryProps.onReset`: Se invoca `onReset` sobre `ErrorBoundaryProps`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML) (corrida e2e 20261109184921254), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

### Reto
- Tema: Construye operaciones CRUD en Bases de Datos SQL y NoSQL
- Seniority: trainee-l2
- Tipo: practical
- Título: Implementación de Operaciones CRUD en Bases de Datos
- Tiempo estimado: 6 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del Entorno — objetivo: Preparar el entorno de desarrollo para las operaciones CRUD. — entregable (NO resolver): Entorno de desarrollo configurado y listo para la implementación de operaciones CRUD.
- Fase 2: Implementación de Operaciones CRUD en Base de Datos SQL — objetivo: Implementar operaciones CRUD en una base de datos SQL. — entregable (NO resolver): Operaciones CRUD implementadas y funcionales en una base de datos SQL.
- Fase 3: Implementación de Operaciones CRUD en Base de Datos NoSQL — objetivo: Implementar operaciones CRUD en una base de datos NoSQL. — entregable (NO resolver): Operaciones CRUD implementadas y funcionales en una base de datos NoSQL.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "inventory-api",
  "version": "1.0.0",
  "description": "API para gestión de inventario con operaciones CRUD en SQL y NoSQL",
  "main": "dist/main.js",
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/config": "^3.2.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/mongoose": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^7.4.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "mongodb": "^6.3.0",
    "mongoose": "^8.0.3",
    "pg": "^8.11.3",
    "reflect-metadata": "^0.2.1",
    "typeorm": "^0.3.20",
    "uuid": "^9.0.1",
    "@nestjs/typeorm": "11.0.0"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.0.0",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.11.19",
    "@types/supertest": "^6.0.2",
    "@types/uuid": "^9.0.8",
    "jest": "^29.7.0",
    "prettier": "^3.2.5",
    "rimraf": "^5.0.5",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.2",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.3.3"
  }
}


// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "esModuleInterop": true,
    "strict": true,
    "strictPropertyInitialization": false
  },
  "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración global de pipes para validación
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('API para gestión de inventario con operaciones CRUD en SQL y NoSQL')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configuración del puerto desde variables de entorno
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

// === ARCHIVO: api/src/domain/product.entity.ts ===
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, Min } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class ProductEntity {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  @Min(0)
  price: number;

  @IsNumber()
  @IsPositive()
  @Min(0)
  stock: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string,
    sku: string,
    id?: string,
  ) {
    this.id = id || uuidv4();
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.sku = sku;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateDetails(name: string, description: string, price: number, category: string): void {
    if (!name || !description || price <= 0 || !category) {
      throw new Error('Invalid product details');
    }
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.updatedAt = new Date();
  }

  adjustStock(quantity: number): void {
    if (this.stock + quantity < 0) {
      throw new Error('Insufficient stock');
    }
    this.stock += quantity;
    this.updatedAt = new Date();
  }

  validate(): boolean {
    return (
      !!this.name &&
      !!this.description &&
      this.price > 0 &&
      this.stock >= 0 &&
      !!this.category &&
      !!this.sku
    );
  }
}

// === ARCHIVO: api/src/domain/repositories/product.repository.ts ===
import { ProductEntity } from '../product.entity';

export interface ProductRepository {
  create(product: ProductEntity): Promise<ProductEntity>;
  findById(id: string): Promise<ProductEntity | null>;
  update(product: ProductEntity): Promise<ProductEntity>;
  delete(id: string): Promise<void>;
  findAll(): Promise<ProductEntity[]>;
  findBySku(sku: string): Promise<ProductEntity | null>;
}

// === ARCHIVO: api/src/infrastructure/repositories/sql/product.sql.repository.ts ===
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../../domain/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';

@Injectable()
export class ProductSqlRepository implements ProductRepository {
  private readonly logger = new Logger(ProductSqlRepository.name);

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(product: ProductEntity): Promise<ProductEntity> {
    const existingProduct = await this.findBySku(product.sku);
    if (existingProduct) {
      throw new Error('Product with this SKU already exists');
    }
    const savedProduct = await this.productRepository.save(product);
    this.logger.log(`Product created with ID: ${savedProduct.id}`);
    return savedProduct;
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(product: ProductEntity): Promise<ProductEntity> {
    const existingProduct = await this.findById(product.id);
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${product.id} not found`);
    }
    const updatedProduct = await this.productRepository.save(product);
    this.logger.log(`Product updated with ID: ${updatedProduct.id}`);
    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    const product = await this.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productRepository.delete(id);
    this.logger.log(`Product deleted with ID: ${id}`);
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find();
    this.logger.log(`Found ${products.length} products`);
    return products;
  }

  async findBySku(sku: string): Promise<ProductEntity | null> {
    return await this.productRepository.findOne({ where: { sku } });
  }
}

// === ARCHIVO: api/src/infrastructure/repositories/nosql/product.nosql.repository.ts ===
import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model, Document } from 'mongoose';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductEntity } from '../../../domain/product.entity';

// Interfaz que extiende Document de Mongoose para el esquema de productos
interface ProductDocument extends Document {
  _id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProductNoSqlRepository implements ProductRepository, OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ProductNoSqlRepository.name);
  private productModel: Model<ProductDocument>;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.logger.log('ProductNoSqlRepository inicializado con conexión a MongoDB');
  }

  async onModuleInit(): Promise<void> {
    try {
      this.productModel = this.connection.model<ProductDocument>('Product');
      this.logger.log('Modelo de producto registrado en Mongoose');
    } catch (error) {
      this.logger.error('Error al inicializar el modelo de producto', error);
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('Cerrando conexión de MongoDB');
    await this.connection.close();
  }

  private mapDocumentToEntity(doc: ProductDocument): ProductEntity {
    const entity = new ProductEntity(
      doc.sku,
      doc.name,
      doc.description,
      doc.price,
      doc.category,
      doc.stock,
    );
    entity.updateDetails(doc.name, doc.description, doc.price, doc.category);
    return entity;
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    try {
      const existingProduct = await this.findBySku(product.sku);
      if (existingProduct) {
        throw new Error(`Ya existe un producto con el SKU: ${product.sku}`);
      }

      const productData = {
        sku: product.sku,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createdProduct = new this.productModel(productData);
      const savedProduct = await createdProduct.save();
      this.logger.log(`Producto creado exitosamente con ID: ${savedProduct._id}`);

      return this.mapDocumentToEntity(savedProduct);
    } catch (error) {
      this.logger.error(`Error al crear producto: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findById(id: string): Promise<ProductEntity | null> {
    try {
      const product = await this.productModel.findById(id).exec();
      if (!product) {
        this.logger.warn(`Producto no encontrado con ID: ${id}`);
        return null;
      }
      return this.mapDocumentToEntity(product);
    } catch (error) {
      this.logger.error(`Error al buscar producto por ID: ${error.message}`, error.stack);
      if (error.name === 'CastError') {
        return null;
      }
      throw error;
    }
  }

  async update(product: ProductEntity): Promise<ProductEntity> {
    try {
      const existingProduct = await this.findById(product.id);
      if (!existingProduct) {
        throw new Error(`Producto no encontrado con ID: ${product.id}`);
      }

      const skuChanged = existingProduct.sku !== product.sku;
      if (skuChanged) {
        const productWithNewSku = await this.findBySku(product.sku);
        if (productWithNewSku && productWithNewSku.id !== product.id) {
          throw new Error(`Ya existe un producto con el SKU: ${product.sku}`);
        }
      }

      const updatedProduct = await this.productModel
        .findByIdAndUpdate(
          product.id,
          {
            $set: {
              sku: product.sku,
              name: product.name,
              description: product.description,
              price: product.price,
              category: product.category,
              stock: product.stock,
              updatedAt: new Date(),
            },
          },
          { new: true },
        )
        .exec();

      if (!updatedProduct) {
        throw new Error(`Error al actualizar el producto con ID: ${product.id}`);
      }

      this.logger.log(`Producto actualizado exitosamente con ID: ${updatedProduct._id}`);
      return this.mapDocumentToEntity(updatedProduct);
    } catch (error) {
      this.logger.error(`Error al actualizar producto: ${error.message}`, error.stack);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.productModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new Error(`Producto no encontrado con ID: ${id}`);
      }
      this.logger.log(`Producto eliminado exitosamente con ID: ${id}`);
    } catch (error) {
      this.logger.error(`Error al eliminar producto: ${error.message}`, error.stack);
      if (error.message.includes('no encontrado')) {
        throw error;
      }
      if (error.name === 'CastError') {
        throw new Error(`Producto no encontrado con ID: ${id}`);
      }
      throw error;
    }
  }

  async findAll(): Promise<ProductEntity[]> {
    try {
      const products = await this.productModel.find().sort({ createdAt: -1 }).exec();
      this.logger.log(`Se encontraron ${products.length} productos`);
      return products.map((doc) => this.mapDocumentToEntity(doc));
    } catch (error) {
      this.logger.error(`Error al listar productos: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findBySku(sku: string): Promise<ProductEntity | null> {
    try {
      const product = await this.productModel.findOne({ sku }).exec();
      if (!product) {
        return null;
      }
      return this.mapDocumentToEntity(product);
    } catch (error) {
      this.logger.error(`Error al buscar producto por SKU: ${error.message}`, error.stack);
      throw error;
    }
  }
}

// === ARCHIVO: api/src/infrastructure/controllers/dto/create-product.dto.ts ===
import { IsString, IsNumber, IsNotEmpty, Min, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'SKU-001',
    description: 'Código único de identificación del producto',
    type: String,
  })
  @IsString({ message: 'El SKU debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El SKU es obligatorio' })
  @MaxLength(50, { message: 'El SKU no puede exceder 50 caracteres' })
  sku: string;

  @ApiProperty({
    example: 'Laptop Dell XPS 15',
    description: 'Nombre del producto',
    type: String,
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(200, { message: 'El nombre no puede exceder 200 caracteres' })
  name: string;

  @ApiPropertyOptional({
    example: 'Laptop de alta gama con procesador Intel Core i7',
    description: 'Descripción detallada del producto',
    type: String,
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  @MaxLength(1000, { message: 'La descripción no puede exceder 1000 caracteres' })
  description?: string;

  @ApiProperty({
    example: 1299.99,
    description: 'Precio del producto en la moneda base',
    type: Number,
  })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsNotEmpty({ message: 'El precio es obligatorio' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  @Max(999999.99, { message: 'El precio excede el límite permitido' })
  price: number;

  @ApiProperty({
    example: 'Electrónica',
    description: 'Categoría a la que pertenece el producto',
    type: String,
  })
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  @MaxLength(100, { message: 'La categoría no puede exceder 100 caracteres' })
  category: string;

  @ApiProperty({
    example: 50,
    description: 'Cantidad disponible en inventario',
    type: Number,
  })
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @IsNotEmpty({ message: 'El stock es obligatorio' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  @Max(999999, { message: 'El stock excede el límite permitido' })
  stock: number;
}

// === ARCHIVO: api/src/infrastructure/controllers/dto/update-product.dto.ts ===
import { IsString, IsNumber, IsOptional, Min, MaxLength, MinLength, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    example: 'SKU-001-UPDATED',
    description: 'Código único de identificación del producto',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'El SKU debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El SKU no puede exceder 50 caracteres' })
  sku?: string;

  @ApiPropertyOptional({
    example: 'Laptop Dell XPS 15 Pro',
    description: 'Nombre del producto',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(1, { message: 'El nombre no puede estar vacío' })
  @MaxLength(200, { message: 'El nombre no puede exceder 200 caracteres' })
  name?: string;

  @ApiPropertyOptional({
    example: 'Laptop de alta gama con procesador Intel Core i9 y 32GB RAM',
    description: 'Descripción detallada del producto',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(1000, { message: 'La descripción no puede exceder 1000 caracteres' })
  description?: string;

  @ApiPropertyOptional({
    example: 1499.99,
    description: 'Precio del producto en la moneda base',
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  @Max(999999.99, { message: 'El precio excede el límite permitido' })
  price?: number;

  @ApiPropertyOptional({
    example: 'Computación',
    description: 'Categoría a la que pertenece el producto',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @MaxLength(100, { message: 'La categoría no puede exceder 100 caracteres' })
  category?: string;

  @ApiPropertyOptional({
    example: 75,
    description: 'Cantidad disponible en inventario',
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  @Max(999999, { message: 'El stock excede el límite permitido' })
  stock?: number;
}

// === ARCHIVO: api/src/infrastructure/controllers/product.controller.ts ===
import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, ParseUUIDPipe, NotFoundException, Inject } from '@nestjs/common';
import { ProductService } from '../../application/services/product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from '../../domain/product.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    @Inject(ProductService)
    private readonly productService: ProductService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente', type: ProductEntity })
  @ApiResponse({ status: 400, description: 'Datos de producto inválidos' })
  @ApiResponse({ status: 409, description: 'Producto con SKU duplicado' })
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return await this.productService.createProduct(createProductDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiParam({ name: 'id', description: 'UUID del producto', type: String })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: ProductEntity })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async getProduct(@Param('id', ParseUUIDPipe) id: string): Promise<ProductEntity> {
    const product = await this.productService.getProduct(id);
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiParam({ name: 'id', description: 'UUID del producto', type: String })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente', type: ProductEntity })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiResponse({ status: 409, description: 'Conflicto al actualizar producto' })
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un producto por su ID' })
  @ApiParam({ name: 'id', description: 'UUID del producto', type: String })
  @ApiResponse({ status: 204, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.productService.deleteProduct(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos', type: [ProductEntity] })
  async listProducts(): Promise<ProductEntity[]> {
    return await this.productService.listProducts();
  }
}

// === ARCHIVO: api/src/infrastructure/config/database.config.ts ===
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export interface DatabaseConfig {
  sql: TypeOrmModuleOptions;
  nosql: MongooseModuleFactoryOptions;
}

@Injectable()
export class DatabaseConfigService {
  private readonly logger = new Logger(DatabaseConfigService.name);

  constructor(private readonly configService: ConfigService) {}

  getSqlConfig(): TypeOrmModuleOptions {
    const config: TypeOrmModuleOptions = {
      type: 'postgres',
      host: this.configService.get<string>('DB_SQL_HOST', 'localhost'),
      port: this.configService.get<number>('DB_SQL_PORT', 5432),
      username: this.configService.get<string>('DB_SQL_USERNAME', 'postgres'),
      password: this.configService.get<string>('DB_SQL_PASSWORD', 'postgres'),
      database: this.configService.get<string>('DB_SQL_DATABASE', 'inventory'),
      entities: [__dirname + '/../../domain/**/*.entity{.ts,.js}'],
      synchronize: this.configService.get<boolean>('DB_SQL_SYNCHRONIZE', false),
      logging: this.configService.get<boolean>('DB_SQL_LOGGING', false),
      ssl: this.configService.get<boolean>('DB_SQL_SSL', false)
        ? { rejectUnauthorized: false }
        : false,
      extra: {
        connectionLimit: this.configService.get<number>('DB_SQL_POOL_SIZE', 10),
        idleTimeoutMillis: this.configService.get<number>('DB_SQL_IDLE_TIMEOUT', 30000),
        max: this.configService.get<number>('DB_SQL_MAX_CONNECTIONS', 20),
      },
    };

    this.logger.log(`SQL Database configured: ${config.host}:${config.port}/${config.database}`);
    return config;
  }

  getNoSqlConfig(): MongooseModuleFactoryOptions {
    const config: MongooseModuleFactoryOptions = {
      uri: `mongodb://${this.configService.get<string>('DB_NOSQL_HOST', 'localhost')}:${this.configService.get<number>('DB_NOSQL_PORT', 27017)}/${this.configService.get<string>('DB_NOSQL_DATABASE', 'inventory_nosql')}`,
      dbName: this.configService.get<string>('DB_NOSQL_DATABASE', 'inventory_nosql'),
      user: this.configService.get<string>('DB_NOSQL_USERNAME'),
      pass: this.configService.get<string>('DB_NOSQL_PASSWORD'),
      serverSelectionTimeoutMS: this.configService.get<number>('DB_NOSQL_TIMEOUT', 5000),
      socketTimeoutMS: this.configService.get<number>('DB_NOSQL_SOCKET_TIMEOUT', 45000),
      maxPoolSize: this.configService.get<number>('DB_NOSQL_POOL_SIZE', 10),
      minPoolSize: this.configService.get<number>('DB_NOSQL_MIN_POOL_SIZE', 2),
      appName: 'inventory-api',
    };

    this.logger.log(`NoSQL Database configured: ${config.uri}`);
    return config;
  }

  getDatabaseConfig(): DatabaseConfig {
    return {
      sql: this.getSqlConfig(),
      nosql: this.getNoSqlConfig(),
    };
  }
}

export const databaseConfigFactory = {
  provide: 'DATABASE_CONFIG',
  useFactory: (configService: ConfigService): DatabaseConfig => {
    const service = new DatabaseConfigService(configService);
    return service.getDatabaseConfig();
  },
  inject: [ConfigService],
};

// === ARCHIVO: api/src/app.module.ts ===
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './infrastructure/controllers/product.controller';
import { ProductService } from './application/services/product.service';
import { ProductSqlRepository } from './infrastructure/repositories/sql/product.sql.repository';
import { ProductRepository } from './domain/repositories/product.repository';
import { databaseConfigFactory } from './infrastructure/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_SQL_HOST', 'localhost'),
          port: configService.get<number>('DB_SQL_PORT', 5432),
          username: configService.get<string>('DB_SQL_USERNAME', 'postgres'),
          password: configService.get<string>('DB_SQL_PASSWORD', 'postgres'),
          database: configService.get<string>('DB_SQL_DATABASE', 'inventory'),
          entities: [__dirname + '/domain/**/*.entity{.ts,.js}'],
          synchronize: configService.get<boolean>('DB_SQL_SYNCHRONIZE', false),
          logging: configService.get<boolean>('DB_SQL_LOGGING', false),
          ssl: configService.get<boolean>('DB_SQL_SSL', false)
            ? { rejectUnauthorized: false }
            : false,
        };
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('DB_NOSQL_HOST', 'localhost');
        const port = configService.get<number>('DB_NOSQL_PORT', 27017);
        const database = configService.get<string>('DB_NOSQL_DATABASE', 'inventory_nosql');
        const username = configService.get<string>('DB_NOSQL_USERNAME');
        const password = configService.get<string>('DB_NOSQL_PASSWORD');

        let uri = `mongodb://${host}:${port}/${database}`;
        if (username && password) {
          uri = `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}/${database}?authSource=admin`;
        }

        return {
          uri,
          dbName: database,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
          maxPoolSize: 10,
          minPoolSize: 2,
          appName: 'inventory-api',
        };
      },
    }),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: ProductRepository,
      useClass: ProductSqlRepository,
    },
  ],
})
export class AppModule {}

// === ARCHIVO: api/src/application/services/product.service.ts ===
import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/product.entity';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async create(data: {
    name: string;
    description: string;
    price: number;
    category: string;
    sku: string;
    stock: number;
  }): Promise<ProductEntity> {
    const existingProduct = await this.productRepository.findBySku(data.sku);
    if (existingProduct) {
      throw new ConflictException(`Product with SKU ${data.sku} already exists`);
    }

    const product = new ProductEntity(
      data.name,
      data.description,
      data.price,
      data.category,
      data.sku,
      data.stock,
    );

    if (!product.validate()) {
      throw new ConflictException('Invalid product data');
    }

    return this.productRepository.create(product);
  }

  async findById(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.findAll();
  }

  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
      price?: number;
      category?: string;
      stock?: number;
    },
  ): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (data.name !== undefined || data.description !== undefined || data.price !== undefined || data.category !== undefined) {
      product.updateDetails(
        data.name ?? product.name,
        data.description ?? product.description,
        data.price ?? product.price,
        data.category ?? product.category,
      );
    }

    if (data.stock !== undefined) {
      product.adjustStock(data.stock);
    }

    if (!product.validate()) {
      throw new ConflictException('Invalid product data after update');
    }

    return this.productRepository.update(product);
  }

  async delete(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.productRepository.delete(id);
  }
}

// === ARCHIVO: api/test/product.service.spec.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { ProductService, PRODUCT_REPOSITORY } from '../src/application/services/product.service';
import { ProductEntity } from '../src/domain/product.entity';

describe('ProductService', () => {
  let service: ProductService;
  let mockRepository: {
    create: jest.Mock;
    findById: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    findAll: jest.Mock;
    findBySku: jest.Mock;
  };

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findBySku: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  describe('create', () => {
    it('debería crear un producto exitosamente', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        category: 'Electronics',
        sku: 'TEST-001',
        stock: 10,
      };

      const mockProduct = new ProductEntity(
        productData.name,
        productData.description,
        productData.price,
        productData.category,
        productData.sku,
        productData.stock,
      );

      mockRepository.findBySku.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue(mockProduct);

      const result = await service.create(productData);

      expect(mockRepository.findBySku).toHaveBeenCalledWith(productData.sku);
      expect(mockRepository.create).toHaveBeenCalled();
      expect(result).toEqual(mockProduct);
    });

    it('debería lanzar ConflictException si el SKU ya existe', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        category: 'Electronics',
        sku: 'TEST-001',
        stock: 10,
      };

      const existingProduct = new ProductEntity(
        productData.name,
        productData.description,
        productData.price,
        productData.category,
        productData.sku,
        productData.stock,
      );

      mockRepository.findBySku.mockResolvedValue(existingProduct);

      await expect(service.create(productData)).rejects.toThrow(ConflictException);
      expect(mockRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('debería retornar un producto por ID', async () => {
      const mockProduct = new ProductEntity(
        'Test Product',
        'Description',
        100,
        'Electronics',
        'TEST-001',
        10,
      );

      mockRepository.findById.mockResolvedValue(mockProduct);

      const result = await service.findById('123');

      expect(mockRepository.findById).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockProduct);
    });

    it('debería lanzar NotFoundException si el producto no existe', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.findById('nonexistent-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('debería retornar todos los productos', async () => {
      const mockProducts = [
        new ProductEntity('Product 1', 'Desc 1', 100, 'Cat1', 'SKU-1', 10),
        new ProductEntity('Product 2', 'Desc 2', 200, 'Cat2', 'SKU-2', 20),
      ];

      mockRepository.findAll.mockResolvedValue(mockProducts);

      const result = await service.findAll();

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('update', () => {
    it('debería actualizar un producto exitosamente', async () => {
      const existingProduct = new ProductEntity(
        'Old Name',
        'Old Description',
        100,
        'Old Category',
        'TEST-001',
        10,
      );

      const updatedProduct = new ProductEntity(
        'New Name',
        'New Description',
        150,
        'New Category',
        'TEST-001',
        20,
      );

      mockRepository.findById.mockResolvedValue(existingProduct);
      mockRepository.update.mockResolvedValue(updatedProduct);

      const result = await service.update('123', {
        name: 'New Name',
        description: 'New Description',
        price: 150,
        category: 'New Category',
        stock: 20,
      });

      expect(mockRepository.update).toHaveBeenCalled();
      expect(result).toEqual(updatedProduct);
    });

    it('debería lanzar NotFoundException si el producto no existe', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(
        service.update('nonexistent-id', { name: 'New Name' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('debería eliminar un producto exitosamente', async () => {
      const mockProduct = new ProductEntity(
        'Test Product',
        'Description',
        100,
        'Electronics',
        'TEST-001',
        10,
      );

      mockRepository.findById.mockResolvedValue(mockProduct);
      mockRepository.delete.mockResolvedValue(undefined);

      await service.delete('123');

      expect(mockRepository.delete).toHaveBeenCalledWith('123');
    });

    it('debería lanzar NotFoundException si el producto no existe', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.delete('nonexistent-id')).rejects.toThrow(NotFoundException);
    });
  });
});

// === ARCHIVO: api/test/jest-e2e.json ===
{
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}


// === ARCHIVO: client/package.json ===
{
  "name": "inventory-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write src"
  },
  "dependencies": {
    "react": "19.0.0-rc.0",
    "react-dom": "19.0.0-rc.0",
    "axios": "1.6.8",
    "@tanstack/react-query": "5.32.0",
    "react-router-dom": "6.23.0"
  },
  "devDependencies": {
    "@types/react": "18.2.79",
    "@types/react-dom": "18.2.25",
    "@vitejs/plugin-react": "4.2.1",
    "typescript": "^5.7.3",
    "vite": "5.2.11",
    "eslint": "8.57.0",
    "eslint-plugin-react": "7.34.1",
    "eslint-plugin-react-hooks": "4.6.0",
    "eslint-plugin-react-refresh": "0.4.6",
    "prettier": "3.2.5",
    "vitest": "1.5.3",
    "@testing-library/react": "15.0.2",
    "@testing-library/jest-dom": "6.4.2",
    "jsdom": "24.0.0"
  },
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended"
    ],
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    }
  },
  "prettier": {
    "semi": true,
    "singleQuote": true,
    "trailingComma": "es5",
    "printWidth": 100
  }
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    sourcemap: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts']
  }
});

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "src"
  ]
}


// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// === ARCHIVO: client/src/App.tsx ===
import { Routes, Route } from 'react-router-dom';
import ProductList from './features/products/ProductList';
import ProductForm from './features/products/ProductForm';
import { Suspense, Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  FallbackComponent: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>;
  onReset: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary capturó un error:', error, errorInfo);
  }

  resetErrorBoundary = (): void => {
    this.setState({ hasError: false, error: null });
    this.props.onReset();
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      return (
        <this.props.FallbackComponent
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div role="alert" style={{ padding: '2rem', textAlign: 'center' }}>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Something went wrong:</p>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
        {error.message}
      </pre>
      <button
        onClick={resetErrorBoundary}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        Try again
      </button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header
          className="app-header"
          style={{
            backgroundColor: '#2c3e50',
            color: 'white',
            padding: '1.5rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Inventory Management</h1>
        </header>
        <main
          className="app-main"
          style={{
            flex: 1,
            padding: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%'
          }}
        >
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/products/new" element={<ProductForm />} />
              <Route path="/products/:id/edit" element={<ProductForm />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;

// === ARCHIVO: client/index.html ===
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sistema de gestión de inventario para tienda online - CRUD de productos" />
    <meta name="theme-color" content="#1890ff" />
    <meta name="author" content="Inventory Team" />
    <meta name="keywords" content="inventario, productos, gestión, CRUD, tienda online" />
    <title>Gestión de Inventario - Productos</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f5f5f5;
        min-height: 100vh;
      }
      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        flex-direction: column;
        gap: 16px;
      }
      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #1890ff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .error-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
        text-align: center;
      }
      .error-message {
        background: #fff1f0;
        border: 1px solid #ffa39e;
        padding: 24px;
        border-radius: 8px;
        max-width: 500px;
      }
      .error-message h2 {
        color: #cf1322;
        margin-bottom: 8px;
      }
      .error-message p {
        color: #434343;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Cargando aplicación de inventario...</p>
      </div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/features/products/ProductList.tsx ===
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductListProps {
  onError?: (error: string) => void;
}

export function ProductList({ onError }: ProductListProps) {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const API_URL = 'http://localhost:3000';

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Product[]>(`${API_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los productos';
      setError(errorMessage);
      onError?.(errorMessage);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      return;
    }

    try {
      setDeletingId(id);
      await axios.delete(`${API_URL}/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar el producto';
      setError(errorMessage);
      onError?.(errorMessage);
      console.error('Error deleting product:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="product-list-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-container">
        <div className="error-state">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={fetchProducts} className="retry-button">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1>Gestión de Productos</h1>
        <Link to="/products/new" className="add-button">
          + Nuevo Producto
        </Link>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre, SKU o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <p>No hay productos registrados</p>
          <Link to="/products/new" className="add-first-button">
            Agregar el primer producto
          </Link>
        </div>
      ) : (
        <>
          <div className="products-count">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </div>

          <table className="products-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('sku')} className="sortable">
                  SKU {sortField === 'sku' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('name')} className="sortable">
                  Nombre {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('category')} className="sortable">
                  Categoría {sortField === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('price')} className="sortable">
                  Precio {sortField === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('quantity')} className="sortable">
                  Cantidad {sortField === 'quantity' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product) => (
                <tr key={product.id} className={deletingId === product.id ? 'deleting' : ''}>
                  <td>{product.sku}</td>
                  <td>{product.name}</td>
                  <td>
                    <span className="category-badge">{product.category}</span>
                  </td>
                  <td>{formatPrice(product.price)}</td>
                  <td>
                    <span className={product.quantity < 10 ? 'low-stock' : ''}>
                      {product.quantity}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="view-button"
                      disabled={deletingId === product.id}
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => navigate(`/products/${product.id}/edit`)}
                      className="edit-button"
                      disabled={deletingId === product.id}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="delete-button"
                      disabled={deletingId === product.id}
                    >
                      {deletingId === product.id ? 'Eliminando...' : 'Eliminar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ProductList;

// === ARCHIVO: client/src/features/products/ProductForm.tsx ===
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  quantity: string;
  category: string;
  sku: string;
}

interface Product extends ProductFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductFormProps {
  isEditMode?: boolean;
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
}

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  price: '',
  quantity: '',
  category: '',
  sku: ''
};

export function ProductForm({ isEditMode = false, onSuccess, onError }: ProductFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(isEditMode);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  const API_URL = 'http://localhost:3000';

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    } else if (formData.name.length > 100) {
      newErrors.name = 'El nombre no puede exceder 100 caracteres';
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'El SKU es requerido';
    } else if (!/^[A-Z0-9-]+$/.test(formData.sku)) {
      newErrors.sku = 'El SKU debe contener solo letras mayúsculas, números y guiones';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'El precio es requerido';
    } else {
      const priceNum = parseFloat(formData.price);
      if (isNaN(priceNum) || priceNum < 0) {
        newErrors.price = 'El precio debe ser un número positivo';
      } else if (priceNum > 999999.99) {
        newErrors.price = 'El precio no puede exceder 999999.99';
      }
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = 'La cantidad es requerida';
    } else {
      const quantityNum = parseInt(formData.quantity, 10);
      if (isNaN(quantityNum) || quantityNum < 0) {
        newErrors.quantity = 'La cantidad debe ser un número entero positivo';
      } else if (quantityNum > 999999) {
        newErrors.quantity = 'La cantidad no puede exceder 999999';
      }
    }

    if (!formData.category.trim()) {
      newErrors.category = 'La categoría es requerida';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'La descripción no puede exceder 500 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const fetchProduct = useCallback(async () => {
    if (!id) return;

    try {
      setFetchingProduct(true);
      const response = await axios.get<Product>(`${API_URL}/products/${id}`);
      const product = response.data;
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        quantity: product.quantity.toString(),
        category: product.category,
        sku: product.sku
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar el producto';
      onError?.(errorMessage);
      console.error('Error fetching product:', err);
    } finally {
      setFetchingProduct(false);
    }
  }, [id, onError]);

  useEffect(() => {
    if (isEditMode && id) {
      fetchProduct();
    }
  }, [isEditMode, id, fetchProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof ProductFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity, 10),
        category: formData.category.trim(),
        sku: formData.sku.trim().toUpperCase()
      };

      if (isEditMode && id) {
        await axios.put(`${API_URL}/products/${id}`, payload);
        onSuccess?.('Producto actualizado correctamente');
      } else {
        await axios.post(`${API_URL}/products`, payload);
        onSuccess?.('Producto creado correctamente');
      }

      navigate('/products');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setErrors({ sku: 'Ya existe un producto con este SKU' });
        } else {
          const errorMessage = err.response?.data?.message || err.message;
          onError?.(errorMessage);
        }
      } else {
        const errorMessage = err instanceof Error ? err.message : 'Error al guardar el producto';
        onError?.(errorMessage);
      }
      console.error('Error saving product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  if (fetchingProduct) {
    return (
      <div className="product-form-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando producto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-form-container">
      <div className="form-header">
        <h1>{isEditMode ? 'Editar Producto' : 'Nuevo Producto'}</h1>
        <Link to="/products" className="back-link">
          ← Volver a la lista
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="sku">
            SKU <span className="required">*</span>
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            disabled={loading || isEditMode}
            placeholder="Ej: PROD-001"
            className={errors.sku ? 'error' : ''}
          />
          {errors.sku && <span className="error-message">{errors.sku}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="name">
            Nombre <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            placeholder="Nombre del producto"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
            placeholder="Descripción detallada del producto"
            rows={4}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">
              Precio (€) <span className="required">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              disabled={loading}
              placeholder="0.00"
              step="0.01"
              min="0"
              max="999999.99"
              className={errors.price ? 'error' : ''}
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="quantity">
              Cantidad <span className="required">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              disabled={loading}
              placeholder="0"
              min="0"
              max="999999"
              className={errors.quantity ? 'error' : ''}
            />
            {errors.quantity && <span className="error-message">{errors.quantity}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">
            Categoría <span className="required">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={loading}
            className={errors.category ? 'error' : ''}
          >
            <option value="">Seleccionar categoría</option>
            <option value="electronics">Electrónica</option>
            <option value="clothing">Ropa</option>
            <option value="food">Alimentación</option>
            <option value="books">Libros</option>
            <option value="home">Hogar</option>
            <option value="sports">Deportes</option>
            <option value="toys">Juguetes</option>
            <option value="other">Otros</option>
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Guardando...' : isEditMode ? 'Actualizar Producto' : 'Crear Producto'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="cancel-button"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;

// === ARCHIVO: client/src/index.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: client/src/setupTests.ts ===
// Setup de tests generado automaticamente (referenciado por la config del runner).
// Agrega aca matchers globales o mocks compartidos.
export {};


// === ARCHIVO: .run/api.run.xml ===
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="api" type="js.build_tools.npm" nameIsGenerated="false">
    <package-json value="$PROJECT_DIR$/api/package.json" />
    <command value="run" />
    <scripts>
      <script value="start" />
    </scripts>
    <node-interpreter value="project" />
    <envs>
      <env name="DYNAMODB_ENDPOINT" value="http://localhost:8000" />
      <env name="AWS_REGION" value="us-east-1" />
      <env name="AWS_ACCESS_KEY_ID" value="local" />
      <env name="AWS_SECRET_ACCESS_KEY" value="local" />
      <env name="MONGODB_URI" value="mongodb://localhost:27017/app" />
    </envs>
    <method v="2" />
  </configuration>
</component>


// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s
  mongo:
    image: "mongo:7.0.14"
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_DATABASE: "app"
    volumes:
      - "./infra-local/mongo/init.js:/docker-entrypoint-initdb.d/init.js:ro"
    healthcheck:
      test: ["CMD","mongosh","--quiet","--eval","db.adminCommand('ping').ok"]
      interval: 10s
      timeout: 10s
      retries: 10
      start_period: 20s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |
| MongoDB | `mongo:7.0.14` | 27017 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"


// === ARCHIVO: infra-local/mongo/init.js ===
// Se ejecuta una sola vez al crear el volumen de MongoDB (docker-entrypoint-initdb.d).
db = db.getSiblingDB('app');
db.createCollection('items');
db.items.createIndex({ name: 1 });

```
