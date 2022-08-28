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
		};

		this.rotate = this.position.x.interpolate({
			inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
			outputRange: ["-10deg", "0deg", "10deg"],
			extrapolate: 'clamp'
		});

		this.rotateAndTranslate = {
			transform: [{
				rotate: this.rotate	
			},
			...this.position.getTranslateTransform()
			]
		}

		// Opacidade do texto like
		this.likeOpacity = this.position.x.interpolate({
			inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
			outputRange: [0, 0, 1],
			extrapolate: `clamp`
		});
	
		// Opacidade do texto nope
		this.nopeOpacity = this.position.x.interpolate({
			inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
			outputRange: [1, 0, 0],
			extrapolate: `clamp`
		});

		// Opacidade da carta depois da atual
		this.nextCardOpacity = this.position.x.interpolate({
			inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
			outputRange: [1, 0, 1],
			extrapolate: `clamp`
		});

		// Tamanho da carta depois da atual
		this.nextCardScale = this.position.x.interpolate({
			inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
			outputRange: [1, 0.8, 1],
			extrapolate: `clamp`
		});
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
				this.position.setValue({x: 0, y: 0});
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
						this.rotateAndTranslate,
						{
							height: SCREEN_HEIGHT - 120, // - 120 para ter a altura entre o cabecalho e rodape (60 + 60)
							width: SCREEN_WIDTH, // Cabecalho e rodape nao irao impactar na largura
							padding: 20, 
							position: 'absolute'
						}
					]}>
					<Animated.View
					style={{
								opacity: this.likeOpacity,
								transform: [{rotate: "-30deg"}],
								position: 'absolute',
								top: 50,
								left: 40,
								zIndex: 1000
							}}>
						<Text
						style={{
							borderWidth: 4,
							borderColor: "green",
							color: "green",
							fontSize: 30,
							fontWeight: 800,
							padding: 10
						}}
						>LIKE</Text>
					</Animated.View> 

					<Animated.View 
					style={{
								opacity: this.nopeOpacity,
								transform: [{rotate: "30deg"}],
								position: 'absolute',
								top: 50,
								right: 40,
								zIndex: 1000
							}}>
						<Text
						style={{
							borderWidth: 4,
							borderColor: "red",
							color: "red",
							fontSize: 28,
							fontWeight: 800,
							padding: 10
						}}
						>NOPE</Text>
					</Animated.View> 

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
							opacity: this.nextCardOpacity,
							transform: [{scale: this.nextCardScale}],
							height: SCREEN_HEIGHT - 120, // - 120 para ter a altura entre o cabecalho e rodape (60 + 60)
							width: SCREEN_WIDTH, // Cabecalho e rodape nao irao impactar na largura
							padding: 20, 
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
