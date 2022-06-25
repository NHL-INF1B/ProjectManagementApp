import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Valid inputs for GoToType: "None", "Add", "Edit"
// Valid inputs for GoTo: File you want to go to, leave empty if GoToType is "None"
// Valid inputs for CenterGoTo: "None" or file you want to go to
// Valid inputs for ReturnType: "Back" or "Home"

export default function Header({
  GoToType,
  GoTo,
  CenterGoTo,
  ReturnType,
  projectId,
  userId,
}) {
  const navigation = useNavigation();

  const GoBack = () => {
    navigation.goBack();
  };

  const NavigateTo = () => {
    navigation.navigate(GoTo, {
      projectId: projectId,
      userId: userId,
    });
  };

  const CenterNavigateTo = () => {
    navigation.navigate(CenterGoTo, {
      projectId: projectId,
      userid: userId,
    });
  };

  if (GoToType == "Add") {
    var GoToIcon = "plus";
  } else if (GoToType == "Edit") {
    var GoToIcon = "square-edit-outline";
  }

  if (ReturnType == "Back") {
    var ReturnIcon = "arrow-left";
  } else if (ReturnType == "Home") {
    var ReturnIcon = "home";
  }

  return (
    <View style={Styles.HeaderContainer}>
      {CheckGoTo({ GoToType, NavigateTo, GoToIcon })}

      {CheckCenterGoTo({ CenterGoTo, CenterNavigateTo })}

      <Pressable onPress={GoBack}>
        <View style={Styles.Icon}>
          <MaterialCommunityIcons name={ReturnIcon} size={40} color="black" />
        </View>
      </Pressable>
    </View>
  );
}

const Styles = StyleSheet.create({
  HeaderContainer: {
    backgroundColor: "#009BAA",
    minHeight: 65,
    maxHeight: 65,
    width: "100%",
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  Center: {
    height: 40,
    width: 40,
    marginLeft: "25%",
    marginRight: "25%",
  },
  Icon: {
    height: 40,
    width: 40,
  },
});

function CheckCenterGoTo({ CenterGoTo, CenterNavigateTo }) {
  if (CenterGoTo !== "None") {
    return (
      <View style={Styles.Center}>
        <Pressable onPress={CenterNavigateTo}>
          <MaterialCommunityIcons
            name="account-supervisor"
            size={40}
            color="black"
          />
        </Pressable>
      </View>
    );
  } else {
    return <View style={Styles.Center}></View>;
  }
}

function CheckGoTo({ GoToType, NavigateTo, GoToIcon }) {
  if (GoToType !== "None") {
    return (
      <Pressable onPress={NavigateTo}>
        <View style={Styles.Icon}>
          <MaterialCommunityIcons name={GoToIcon} size={40} color="black" />
        </View>
      </Pressable>
    );
  } else {
    return <View style={Styles.Icon}></View>;
  }
}
