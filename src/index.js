import Main from './Main.elm';
import Thing from './Thing.elm';
import styles from './style.css';

const app = Main.Elm.Main.init({
	node: document.getElementById('elm-root')
});

console.log(Main, Thing)

// app.ports.styles.subscribe(data => {
// 	app.ports.styles.send(styles[data]);
// });

console.log("hello did this work?");
