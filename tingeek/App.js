import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, Image, PanResponder } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

// Array com imagens
const Profile = [
	{id: "1", name: "Skyrim", uri: require('./assets/1.jpg')},
	{id: "2", name: "Dark Souls", uri: require('./assets/2.jpg')},
	{id: "3", name: "Metroid Prime", uri: require('./assets/3.jpg')},
	{id: "4", name: "Zelda Twilight Princess", uri: require('./assets/5.jpg')},
	{id: "5", name: "Zelda A Link Between Worlds", uri: require('./assets/6.jpg')},
	{id: "6", name: "Mario 3D Land", uri: require('./assets/7.jpg')},
	{id: "7", name: "Castlevania Sotn", uri: require('./assets/8.jpg')},
	{id: "8", name: "Subnautica Below Zero", uri: require('./assets/9.png')}

	// { id: "1", name: "Better Call Saul", uri: require("./assets/better-call-saul.jpg") },
	// { id: "2", name: "Breaking Bad", uri: require("./assets/breaking-bad.jpg") },
	// { id: "3", name: "Cuphead Show", uri: require("./assets/cuphead.jpeg") },
	// { id: "4", name: "Stranger Things", uri: require("./assets/stranger_things.jpg") },
	// { id: "5", name: "The Walking Dead", uri: require("./assets/w-d.jpg") }
];



export default class App extends React.Component {

	constructor() {
		super();
		// Define a posicao da carta
		this.position = new Animated.ValueXY();

		// Define a carta para ser controlada no momento
		this.state = {
			currentIndex: 0
		}
	}
	
	// Cria a principal acao a ser feita com as cartas. E executado antes do render() e cria objeto
	// contento informacao da acao
	componentWillMount() {
		this.PanResponder = PanResponder.create({
			// Define caso a acao deve ser executada no comeco
			onStartShouldSetPanResponder: (evt, gestureState) => true,

			// Define o movimento feito quando se interaje com a carta
			onPanResponderMove: (evt, gestureState) => {
				this.position.setValue({x: gestureState.dx, y: gestureState.dy});
			},

			// Define a acao apos acabar o movimento
			onPanResponderRelease: (evt, gestureState) => {

			}
		});
	};

	// Cria array de cartas
	renderProfile = () => {
		return Profile.map((item, i) => {
			
			// Se a carta para ser controlada for antes da exibida agora, nao controle-a e nao exiba-a
			if (this.state.currentIndex > i) return null;

			// Se a carta para ser controlada for a exibida agora, controle-a
			else if (this.state.currentIndex == i) { 
				return (
					<Animated.View 
						{...this.PanResponder.panHandlers}
						key={item.id}
						style={[
						{
							transform: this.position.getTranslateTransform()
						},
						{
							height: SCREEN_HEIGHT - 120, // - 120 para ter a altura entre o cabecalho e rodape (60 + 60)
							width: SCREEN_WIDTH, // Cabecalho e rodape nao irao impactar na largura
							padding: 10, 
							position: 'absolute'
						}
					]}>
					
						<Image 
						style={{ // Primeira imagem
							flex: 1,
							height: null,
							width: null,
							resizeMode: "cover",
							borderRadius: 20
						}} 
						source={item.uri}/>
					</Animated.View>
				);
			}
			
			// Se a carta exibida agora for depois da para ser controlada, exiba-a, mas nao controle-a
			else {
				return (
					<Animated.View 
						key={item.id}
						style={[
						{
							height: SCREEN_HEIGHT - 120, // - 120 para ter a altura entre o cabecalho e rodape (60 + 60)
							width: SCREEN_WIDTH, // Cabecalho e rodape nao irao impactar na largura
							padding: 10, 
							position: 'absolute'
						}
					]}>
					
						<Image 
						style={{ // Primeira imagem
							flex: 1,
							height: null,
							width: null,
							resizeMode: "cover",
							borderRadius: 20
						}} 
						source={item.uri}/>
					</Animated.View>
				);
			}
		}).reverse(); // Reverta o array, caso contrario e retornado um array em ordem oposta
	};

	render() {
		return (
			// Estrutura basica do app
			<View style={{flex: 1}}>
				<View style={{height: 60}}></View>
				<View style={{flex: 1}}>
					{this.renderProfile()}
				</View>
				<View style={{height: 60}}></View>
			</View>
		);
	}
}

// Stylesheet/customizacao da pagina
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
