# Inteligencia Artificial - UTN FRBA
## Trabajo práctico: Algoritmos Genéticos

### Descripción
El código aquí presente es la implementación de un algoritmo genético con el fin de resolver el siguiente acertijo:

> Seis amigas eligen una ficha, cada una entre 6 fichas numeradas con valores enteros diferentes desde 1 hasta 6:
> * El número en la ficha de Cecilia es igual a la suma de los números en las fichas de Ángela, Penélope y Luisa.
> * Miriam tiene una ficha cuyo número es mayor en 4 unidades que la de  Luisa.
> * Penélope tiene una ficha cuyo número es menor en 2 unidades que la de Daniela.

> **¿Cuál es el número en la ficha de Ángela?**

### Desarrollo
Para el desarrollo de este trabajo se usó la biblioteca [genetic-js](https://github.com/subprotocol/genetic-js), y corre sobre [NodeJS](https://nodejs.org/es/)

### ¿Cómo utilizarlo?
1. Instalar NodeJS
2. Abrir una consola en la carpeta donde se descargó el código fuente y correr `npm install` para descargar las dependencias.
3. Verificar los parámetros de configuración. ([referencia](https://github.com/subprotocol/genetic-js#configuration-parameters)).
4. Correr `npm start` para realizar la corrida
5. Se generan 3 archivos de salida
  4. `poblacionXXXXXXXX.csv` que contiene la población genrada
  5. `sampleXXXXXXXX.csv` que contiene como quedó la muestra luego de terminar la corrida
  6. `fitnessXXXXXXXX.csv` que contiene la evolución del individuo más apto a treavés de cada corrida
