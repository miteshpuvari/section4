import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';

import NumberContainer from '../Components/NumberContainer';
import Card from '../Components/Card';
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    else
    {
        return rndNum;
    }
};

const GameScreen = props => {
    const   [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));

    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    
    useEffect(() => {
        if (currentGuess === props.userChoice){
            
        }
    });

    const nextGuessHandler =    direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);

    };

    return(
        <View styles={styles.screen}>
            <Text>Computer Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card styles={styles.buttonContainer}>
            <Button title="Lower" onPress={nextGuessHandler.bind(this, 'lower')}/>
            <Button title="Greater" onPress={nextGuessHandler.bind(this, 'greater')}/>
            </Card>
        </View>
    )
};

const styles= StyleSheet.create({
    screen: {
         flex: 1,
         padding: 10,
         alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;
