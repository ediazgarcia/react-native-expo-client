import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput, Button, Title, Appbar } from 'react-native-paper';
import { createProduct, updateProduct } from '../api/products';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

interface ProductFormProps {
  product?: { id: string; name: string; price: number };
  onSuccess: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSuccess }) => {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price?.toString() || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !price.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      if (product) {
        await updateProduct(product.id, { id: product.id, name, price: parseFloat(price) });
      } else {
        await createProduct({ name, price: parseFloat(price) });
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={onSuccess} />
        <Appbar.Content title={product ? 'Editar Producto' : 'Crear Producto'} titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <View style={styles.content}>
        <Title style={styles.title}>{product ? 'Editar Producto' : 'Crear Nuevo Producto'}</Title>

        <TextInput
          label="Nombre del Producto"
          value={name}
          onChangeText={setName}
          style={styles.input}
          mode="outlined"
          outlineColor={COLORS.primaryLighter}
          activeOutlineColor={COLORS.primary}
        />

        <TextInput
          label="Precio"
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
          style={styles.input}
          mode="outlined"
          outlineColor={COLORS.primaryLighter}
          activeOutlineColor={COLORS.primary}
          left={<TextInput.Affix text="$" />}
        />

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            {product ? 'Actualizar Producto' : 'Crear Producto'}
          </Button>
          <Button
            mode="outlined"
            onPress={onSuccess}
            style={styles.cancelButton}
            labelStyle={styles.cancelButtonLabel}
          >
            Cancelar
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  appbar: { backgroundColor: COLORS.primary },
  appbarTitle: { color: COLORS.white, fontWeight: 'bold' },
  content: { flex: 1, padding: SPACING.lg },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.primaryDark, marginBottom: SPACING['2xl'] },
  input: { marginBottom: SPACING.lg, backgroundColor: COLORS.white },
  buttonContainer: { marginTop: SPACING['2xl'] },
  button: { backgroundColor: COLORS.primary, borderRadius: RADIUS.lg, paddingVertical: 6, marginBottom: SPACING.md },
  buttonLabel: { fontWeight: '600', fontSize: 16 },
  cancelButton: { borderColor: COLORS.primaryLighter, borderRadius: RADIUS.lg, paddingVertical: 6 },
  cancelButtonLabel: { color: COLORS.primaryDark, fontWeight: '600', fontSize: 16 },
});