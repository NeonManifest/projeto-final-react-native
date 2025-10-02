// COMPONENTE DE SELEÇÃO DE DURAÇÃO DA JAM, PERMITE AO USUÁRIO ESCOLHER ENTRE HORAS, DIAS, SEMANAS OU MESES
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { useSystemTheme } from "../contexts/SystemThemeContext";
import { selectStyles as styles } from "../styles/durationSelectStyles";

interface DurationSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const durationOptions = [
  { label: "hours", value: "hours" },
  { label: "days", value: "days" },
  { label: "weeks", value: "weeks" },
  { label: "months", value: "months" },
];

export default function DurationSelect({
  value,
  onValueChange,
}: DurationSelectProps) {
  const theme = useSystemTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.select,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.primary + "40",
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.selectText, { color: theme.colors.text }]}>
          {value}
        </Text>
        <Text style={[styles.dropdownIcon, { color: theme.colors.primary }]}>
          ▼
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <FlatList
              data={durationOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    {
                      backgroundColor:
                        item.value === value
                          ? theme.colors.primary + "20"
                          : "transparent",
                    },
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color: theme.colors.text,
                        fontFamily: "System",
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
