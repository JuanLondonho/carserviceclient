# Servicios y componentes realizados - Laboratorio Angular

### Servicios
Los servicios creados para la gestion del owner fueron:

* **getAll():** Obtiene todos los owners registrados en el sistema.
* **get(href:String):** Obtener un owner en especifico mendiante su url de referencia.
* **save(owner:any):** Recibe un objeto de tipo owner y verifica si el owner existe mediante su url de referencia, si existe lo actualiza y si no existe crea uno nuevo.
* **remove(href:String):** Recibe un url que referencia a un owner en especifico y procede a eliminarlo.

### Componentes
Los nuevos componentes que fueron añadidos al proyecto para un completo funcionamiento son:

* **owner-list:** Este se encarga de listar cada uno de los propietarios que se encuentran registrados en el sistema, además ofrece la opción de volver a lista de carros, de eliminar multiples owners mendiante el componente checkbox, agregar un nuevo owner y modificar uno existente dandole click.

* **ownenr-edit:** Nos permite editar las propiedades de un owner o eliminarlo directamente, ademas validad que no se pueda modificar el DNI, ya que es el identificador principal y unico, por lo tanto modificarlo no está permitido, además este mismo componente nos sirve para agregar un nuevo owner, ya que utiliza los mismos campos, sólo que vacios y sin referenciar ningun owner.

* **car-owner-list:** Este componente permite listar los carros que tienen un propietario, es decir, los que tienen un dni diferente de null, entonces busca el dni asociado a ese carro, obtiene la información de ese owner y los lista. Cabe destacar que sólo los carros con owners serán listados.




# CarServiceClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
