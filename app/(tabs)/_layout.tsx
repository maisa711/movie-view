import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

const TabIcon = ({title, icon, focused}: {title:string, icon:any, focused: boolean}) => {
    if(focused){
        return(
        <ImageBackground 
            className={"flex flex-row flex-1 w-full min-w-[200px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"}
            source={images.highlight}
            >
                <Image source={icon} tintColor="#151312" className="size-5"/>
                <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
            </ImageBackground>
    )
    }

    return(
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} tintColor="#A8B5DB" className="size-5"/>
        </View>
    )
}


const _Layout = () => {
  return (
    <Tabs
    screenOptions={{
        tabBarShowLabel:false,
        tabBarItemStyle: {
            width:"100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
        tabBarStyle: {
            backgroundColor: "#0f0D23",
            borderRadius: 50,
            marginHorizontal: 20,
            marginBottom: 36,
            height: 52,
            width: "auto",
            position: "absolute",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#0f0D23"
        }
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <>
            <TabIcon focused={focused} title="Home" icon={icons.home}/>
            </>
          )
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <>
            <TabIcon focused={focused} title="Search" icon={icons.search}/>
            </>
          )
        }}
        
      />
    </Tabs>
  );
};

export default _Layout;
