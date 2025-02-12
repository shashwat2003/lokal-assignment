import { BookMarked, CircleDollarSign } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color }) => (
            <CircleDollarSign
              color={color as any}
              size={"$1"}
              marginVertical={"$2"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",
          tabBarIcon: ({ color }) => (
            <BookMarked
              color={color as any}
              size={"$1"}
              marginVertical={"$2"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
