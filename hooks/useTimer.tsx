import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";

interface UseTimerOptions {
  initialTime: number;
  onTimerEnd?: () => void;
}

const useTimer = ({ initialTime, onTimerEnd }: UseTimerOptions) => {
  const [time, setTime] = useState(initialTime);
  const intervalRef = useRef<number | null>(null);

  const formatTime = (seconds: number) => {
    const format = (val: number) => `0${Math.floor(val)}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return [minutes, secs].map(format).join(":");
  };

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const saveTimerState = async (endTime: number) => {
    try {
      await AsyncStorage.setItem("timerEndTime", endTime.toString());
    } catch (error) {
      console.log("Error saving timer state:", error);
    }
  };

  const startTimer = (duration: number) => {
    const endTime = Date.now() + duration * 1000;
    saveTimerState(endTime);

    intervalRef.current = setInterval(async () => {
      const currentTime = Date.now();
      const storedEndTime = await AsyncStorage.getItem("timerEndTime");

      if (!storedEndTime) return;

      const remainingTime = Math.ceil(
        (parseInt(storedEndTime) - currentTime) / 1000
      );

      if (remainingTime <= 1) {
        clearTimer();
        await AsyncStorage.removeItem("timerEndTime");
        setTime(0);
        if (onTimerEnd) onTimerEnd();
      } else {
        setTime(remainingTime);
      }
    }, 1000);
  };

  useEffect(() => {
    const initTimer = async () => {
      const storedEndTime = await AsyncStorage.getItem("timerEndTime");
      if (storedEndTime) {
        const remainingTime = Math.ceil(
          (parseInt(storedEndTime) - Date.now()) / 1000
        );
        if (remainingTime > 0) {
          setTime(remainingTime);
          startTimer(remainingTime);
        } else {
          await AsyncStorage.removeItem("timerEndTime");
          if (onTimerEnd) onTimerEnd();
        }
      } else {
        startTimer(initialTime);
      }
    };

    initTimer();
    return () => clearTimer();
  }, [initialTime]);

  const resetTimer = async (newTime: number) => {
    await AsyncStorage.removeItem("timerEndTime");
    clearTimer();
    setTime(newTime);
    startTimer(newTime);
  };

  return {
    time,
    formattedTime: formatTime(time),
    resetTimer,
  };
};

export default useTimer;
