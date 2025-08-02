import { View, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface SearchBarProps {
    onPress?: () => void
    placeholder: string
    value?: string;
    onChangeText?: (value:string) => void;
} 

const SearchBar = ({onPress, placeholder, value, onChangeText}: SearchBarProps) => {
    return (
        <View className="flex-row items-center px-5 py-4">
            <Image
                source={icons.search}
                className="size-5"
                resizeMode="contain"
                tintColor={"#AB8BFF"}
            />
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                className="text-white flex-1 ml-2"
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#AB8BFF"
                autoCorrect={false}
            />
        </View>
    );
};

export default SearchBar;
