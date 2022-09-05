class Developer {
	constructor(nombre, apellido) {
		this.nombre = nombre;
		this.apellido = apellido;
	}

	obtenerNombreCompleto() {
		return this.nombre + " " + this.apellido;
	}
}

const cata = new Developer("Catriel", "Pérez");

export default cata;
