import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

//Our Stylesheet for the stopwatch component
const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    timer: {
        fontSize: 64,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttton: {
        backgroundColor: 'powderblue',
        borderRadius: 10,
        padding: 10,
        margin: 5,
    },
    text: {
        fontWeight:'bold'
    }


});

//Stopwatch functional component
const Stopwatch = () => {
    // set up state to track whether or not the stopwatch is running
    const [isRunning, setIsRunning] = useState(false);
    // state to keep track to elapsed time in secs
    const [time, setTime] = useState(0);

    useEffect (() => {

        let interval;

        // if the stopwatch is running, them set up the interval to update the time every second
        if (isRunning) {

        interval = setInterval (() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);

        } else {
            //in case the watch has been paused
            clearInterval(interval);
        }

    return () => clearInterval(interval);

    }, [isRunning] );

    //Function to handle the reset button presses
    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    //function to handle the start/pause button presses
    const handleToggle = () => {
        setIsRunning(!isRunning);
    };

    //function to format time 00:00 (min:sec)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds/60);
        const remainingSeconds = seconds % 60;

        return `${minutes < 10 ? '0' : ' '}${minutes}: ${remainingSeconds <10 ? '0' : ' '}:${remainingSeconds}`;
    };

    //render the stopwatch component
    return (
        <View style={styles.container}>
            <Text style={styles.timer}>{formatTime(time)}</Text>
            <TouchableOpacity onPress={handleToggle} style={styles.button}>
                <Text style={styles.text}>{isRunning ? 'PAUSE':'START'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReset} style={styles.button}>
                <Text style={styles.text}>RESET</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Stopwatch;