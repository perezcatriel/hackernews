import React, { Component } from "react";
import "./App.css";

import cata from "./Developer";

const helloWorld = "Bienvenido al Camino para aprender React";

const title = "title";
const list = [
	{
		[title]: "React",
		url: "https://facebook.github.io/react/",
		author: "Jordan Walke",
		num_comments: 3,
		points: 4,
		objectID: 0,
	},
	{
		[title]: "Redux",
		url: "https://github.com/reactjs/redux",
		author: "Dan Abramov, Andrew Clark",
		num_comments: 2,
		points: 5,
		objectID: 1,
	},
	{
		[title]: "Mi CV",
		url: "https://perezcatriel.github.io/cv/public",
		author: "Catriel Pérez <perezcatriel@gmail.com>",
		num_comments: 3,
		points: 10,
		objectID: 2,
	},
];

// Función de Orden Superior
// Falta toLowerCase() al item.title y a searchTerm
const isSearched = (searchTerm) => (item) =>
	item.title.toLowerCase().includes(searchTerm.toLowerCase());

const largeColumn = {
	width: "40%",
};
const midColumn = {
	width: "30%",
};
const smallColumn = {
	width: "10%",
};

class App extends Component {
	// Estado local de un objeto
	constructor(props) {
		super(props);

		this.state = {
			// inicializador de Objetos
			list,
			searchTerm: "",
		};

		// enlazarlo (bind con el método de clase) con el id especifico
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
	}

	// eliminar con filter por ID
	onDismiss(id) {
		const actualizarLista = this.state.list.filter(
			(item) => item.objectID !== id
		);

		// flujo de datos Unidireccional
		this.setState({ list: actualizarLista });
	}

	onSearchChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	render() {
		// Desestructuración
		const { searchTerm, list } = this.state;

		return (
			<div className="page">
				<div className="interactions">
					<h2>{helloWorld}</h2>
					<p>Mí nombre es {cata.obtenerNombreCompleto()}</p>

					<Search value={searchTerm} onChange={this.onSearchChange}>
						Search
					</Search>
					<Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />

					{list.filter(isSearched(searchTerm)).map((item) => {
						// Función de Orden Superior. mayor a 1000 implementaciones es mejor llevar esta función al constructor
						const onHandleDismiss = () => this.onDismiss(item.objectID);
					})}
				</div>
			</div>
		);
	}
}

// Dividiendo componentes
/* class Search extends Component {
	render() {
		const { value, onChange, children } = this.props;
		return (
			<form>
				{/* Componentes Ensamblador
				{children}
				<input
					type="text"
					onChange={onChange}
					// Componentes controlados
					value={value}
				/>
			</form>
		);
	}
} */

// Declaración de componentes más desestructuración
const Search = ({ value, onChange, children }) => (
	<form>
		{children} <input type="text" value={value} onChange={onChange} />
	</form>
);

/* class Table extends Component {
	render() {
		const { list, pattern, onDismiss } = this.props;
		return (
			// Agregar un id único para ayudar al rendimiento de React
			<div>
				{list.filter(isSearched(pattern)).map((item) => (
					<div key={item.objectID}>
						{/* Utilizando map para crear un elemento HTML
						<span>
							<a href={item.url}>{item.title} - </a>
						</span>
						<span>{item.author} </span>
						<span>{item.num_comments} </span>
						<span>{item.pointer}</span>
						<span>
							<button onClick={() => onDismiss(item.objectID)}>Dismiss</button>
						</span>
					</div>
				))}
				;
			</div>
		);
	}
} */

// Componente funcional sin estado (declaración de componente)
const Table = ({ list, pattern, onDismiss }) => (
	// Estilizacion de componentes con className
	<div className="table">
		{list.filter(isSearched(pattern)).map((item) => (
			<div key={item.objectID} className="table-row">
				{/* Utilizando map para crear un elemento HTML */}
				<span style={{ width: { largeColumn } }}>
					<a href={item.url}>{item.title} - </a>
				</span>
				<span style={{ width: { midColumn } }}>{item.author} </span>
				<span style={{ width: { smallColumn } }}>{item.num_comments} </span>
				<span style={{ width: { smallColumn } }}>{item.pointer}</span>
				<span style={{ width: { smallColumn } }}>
					<button
						onClick={() => onDismiss(item.objectID)}
						className="button-inline"
					>
						Dismiss
					</button>
				</span>
			</div>
		))}
		;
	</div>
);

// Componente reutilizable
class Button extends Component {
	render() {
		// Parametros por defecto
		const { onClick, className = "", children } = this.props;

		return (
			<button onClick={onClick} className={className} type="button">
				{children}
			</button>
		);
	}
}

export default App;
