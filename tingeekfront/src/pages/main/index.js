import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, Image, PanResponder } from 'react-native';
import { Feather as Icon } from "@expo/vector-icons";

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const Profile = [
  {id: "1", name: "Skyrim", uri: require('../../../assets/1.jpg')},
  {id: "2", name: "Dark Souls", uri: require('../../../assets/2.jpg')},
  {id: "3", name: "Metroid Prime", uri: require('../../../assets/3.jpg')},
  {id: "4", name: "Zelda Twilight Princess", uri: require('../../../assets/5.jpg')},
  {id: "5", name: "Zelda A Link Between Worlds", uri: require('../../../assets/6.jpg')},
  {id: "6", name: "Mario 3D Land", uri: require('../../../assets/7.jpg')},
  {id: "7", name: "Castlevania Sotn", uri: require('../../../assets/8.jpg')},
  {id: "8", name: "Subnautica Below Zero", uri: require('../../../assets/9.png')}

]

export default class Main extends React.Component {

  constructor() {
    super();
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0
    }

  this.rotate = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  })

  this.rotateAndTranslate = {
    transform: [{
      rotate: this.rotate
    },
    ...this.position.getTranslateTransform()
    ]
  }

  this.likeOpacity = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  })

  this.nopeOpacity = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp'
  })

  this.nextCardOpacity = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp'
  })

  this.nextCardScale = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp'
  })

}

  componentWillMount(){
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y:gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
       
          if (gestureState.dx > 120) {
            Animated.spring(this.position, {
              toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
            }).start(() => {
              this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                this.position.setValue({ x: 0, y: 0 })
              })
            })
          } else if (gestureState.dx < -120) {
            Animated.spring(this.position, {
              toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
            }).start(() => {
              this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                this.position.setValue({ x: 0, y: 0 })
              })
            })
          }else{
            Animated.spring(this.position, {
              toValue: {x:0, y:0},
              friction: 1
            }).start()
          }
      }
    })
  }
  
  renderProfile = () => {
    return Profile.map ((item, i) => {
 
      if (i < this.state.currentIndex)
      {
        return null;
      }
      else if (i == this.state.currentIndex)
      {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id}
            style={[
              this.rotateAndTranslate,
              {
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position:'absolute'
              }
            ]}
          >

            <Animated.View
              style={{
                opacity: this.likeOpacity,
                transform: [{ rotate: "-30deg"}],
                position: "absolute",
                top: 50,
                left: 40,
                zIndex: 1000
              }}
            >
              <Text
              style={{
                borderWidth: 5,
                borderColor: "green",
                color: "green",
                fontSize: 32,
                fontWeight: "800",
                padding: 10
              }}
              >LIKE</Text>
            </Animated.View>
            <Animated.View
              style={{
                opacity: this.nopeOpacity,
                transform: [{ rotate: "30deg"}],
                position: "absolute",
                top: 50,
                right: 40,
                zIndex: 1000
              }}
            >
              <Text
              style={{
                borderWidth: 5,
                borderColor: "red",
                color: "red",
                fontSize: 32,
                fontWeight: "800",
                padding: 10
              }}
              >NOPE</Text>
            </Animated.View>

            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20
              }}
              source={item.uri}
            />
          </Animated.View>
        )
      }
      else
      {
        return (
          <Animated.View
            key={item.id}
            style={[
              {
                opacity: this.nextCardOpacity,
                transform: [{scale: this.nextCardScale}],
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position:'absolute'
              }
            ]}
          >
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20
              }}
              source={item.uri}
            />
            <Text style={styles.name}>{item.name}</Text>
          </Animated.View>
        )
      }
    }).reverse();
  }
  
  render(){
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}>
 
          <View style={styles.header}>
            <Icon name="user" size={32} color="gray" />
            <Icon name="message-circle" size={32} color="gray" />
          </View>
 
        </View>
        <View style={{ flex: 1 }}>
 
          {this.renderProfile()}
 
        </View>
        <View style={{ height: 60 }}>
 
          <View style={styles.footer}>
            <View style={styles.circle}>
              <Icon name="x" size={32} color="#ec5288" />
            </View>
            <View style={styles.circle}>
              <Icon name="heart" size={32} color="#6ee3b4" />
            </View>
          </View>
 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 25,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 0,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
  name: {
    color: "white",
    fontSize: 32,
    position: "absolute",
    padding: 20,
    fontWeight: "bold",
  },
});
