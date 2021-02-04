import React, {useState} from 'react';
import { View,
         StyleSheet, 
         Text, 
         Button, 
         TouchableWithoutFeedback,
         Keyboard,
        Alert} from 'react-native';

import Card from '../Components/Card';
import NumberContainer from '../Components/NumberContainer';
import Input from '../Components/Input';
import Colors from '../Constants/Colors';

const StartGameScreen = props => {
    const [enterdValue, setEnterdValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();  
    const numberInputhendelar = inputText => {
        setEnterdValue(inputText.replace(/[^0-9]/g, ''));  // replace the value 0 - 9 with space using that you can not insert any string or , . etc.
    };

    const resetInputHandler = () => {
        setEnterdValue('');
        setConfirmed(false);
    };
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enterdValue);
        if (isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber > 99)
        {
            Alert.alert('Invalid Number!!', 'Number Has to be number between 1 to 99.', [{text: 'Okey', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnterdValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if(confirmed) {
            confirmedOutput = (
                    <Card style={styles.summeryContainer}> 
                        <Text>Your Selected number is</Text>
                        <NumberContainer>{selectedNumber}</NumberContainer>
                        <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)}/>
                    </Card>
                    );
    }

    return (
        <TouchableWithoutFeedback 
        onPress={() => {
            Keyboard.dismiss();
        }}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a new Game</Text>
            <Card style={styles.inpotContainer}>
                <Text>Select a number</Text>
                <Input style={styles.input} 
                placeholder="Enter Data" 
                blurOnSubmit 
                autoCapitalize="none" 
                autoCorrect={false}
                keyboardType="number-pad" 
                 maxLength={2}
                 onChangeText={numberInputhendelar}
                 value={enterdValue} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button1}>
                        <Button title="Reset" 
                                onPress={resetInputHandler} 
                                color={Colors.primary}/>
                    </View>
                    <View style={styles.button2}>
                        <Button title="Confirm"
                                onPress={confirmInputHandler}
                                color={Colors.accent} /></View>
                </View>
            </Card>
            {confirmedOutput}    
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
            marginTop: 10,
            fontSize: 20,
            marginVertical: 10,
    },
    inpotContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        
    },
    buttonContainer: {

        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button1: {
        width: 100, 
    },
    button2: {
        width: 100,
    },
    input: {
        width: 150,
        textAlign: 'center'
    },
    summeryContainer: {
        marginTop:  20,
        alignItems: 'center',

    }
});


export default StartGameScreen;