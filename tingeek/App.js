import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, Image } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').widthw;

// Array com imagens
const Profiles = [
	{ id: "1", name: "Better Call Saul", uri: require("./assets/better-call-saul.jpg") },
	{ id: "2", name: "Breaking Bad", uri: require("./assets/breaking-bad.jpg") },
	{ id: "3", name: "Cuphead Show", uri: require("./assets/cuphead.jpeg") },
	{ id: "4", name: "Stranger Things", uri: require("./assets/stranger_things.jpg") },
	{ id: "5", name: "The Walking Dead", uri: require("./assets/w-d.jpg") }
];



export default class App extends React.Component {
	render() {
		return (
			// Estrutura basica do app
			<View style={{flex: 1}}>
				<View style={{height: 60}}></View>
				<View style={{flex: 1}}>
					<Animated.View style={[
							{
								height: SCREEN_HEIGHT - 120, // - 120 para ter a altura entre o cabecalho e rodape (60 + 60)
								width: SCREEN_WIDTH, // Cabecalho e rodape nao irao impactar na largura
								padding: 25
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
						source={Profiles[0].uri}/>
					</Animated.View>
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
