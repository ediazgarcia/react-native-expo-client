import React, { useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView, RefreshControl, StyleSheet, Modal } from 'react-native';
import { Card, Title, Paragraph, Button, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useProductsStore } from '../store/useProductsStore';
import { ProductForm } from './ProductForm';
import { deleteProduct } from '../api/products';

export const ProductList: React.FC = () => {
  const { products, loading, error, fetchProducts } = useProductsStore();
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; name: string; price: number } | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Mis Productos</Title>
        <Paragraph style={styles.headerSubtitle}>Gestiona tus productos financieros</Paragraph>
      </View>

      {loading && <ActivityIndicator animating={true} size="large" style={styles.loader} />}
      {error ? <Paragraph style={styles.error}>{error}</Paragraph> : null}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchProducts} />}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <View style={styles.cardIconContainer}>
                    <MaterialCommunityIcons name="wallet" size={28} color="#0066CC" />
                  </View>
                  <View style={styles.cardInfo}>
                    <Title style={styles.cardTitle}>{item.name}</Title>
                    <Paragraph style={styles.cardPrice}>${item.price.toFixed(2)}</Paragraph>
                  </View>
                </View>
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button
                  mode="contained"
                  icon={() => <MaterialCommunityIcons name="pencil" size={16} />}
                  onPress={() => handleEdit(item)}
                  style={styles.editButton}
                  labelStyle={styles.buttonLabel}
                >
                  Editar
                </Button>
                <Button
                  mode="outlined"
                  icon={() => <MaterialCommunityIcons name="delete" size={16} />}
                  onPress={() => handleDelete(item.id)}
                  style={styles.deleteButton}
                  labelStyle={styles.deleteButtonLabel}
                >
                  Eliminar
                </Button>
              </Card.Actions>
            </Card>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <MaterialCommunityIcons name="inbox-outline" size={64} color="#D1D5DB" />
            <Paragraph style={styles.emptyText}>No hay productos disponibles</Paragraph>
            <Button mode="contained" onPress={handleCreate} style={styles.createButton}>
              Crear Producto
            </Button>
          </View>
        )}
      />

      <Button
        mode="contained"
        icon="plus"
        onPress={handleCreate}
        style={styles.fab}
        labelStyle={styles.fabLabel}
      >
        Nuevo
      </Button>

      <Modal visible={isModalVisible} animationType="slide">
        <ProductForm
          product={selectedProduct || undefined}
          onSuccess={() => {
            setModalVisible(false);
            fetchProducts();
          }}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { backgroundColor: '#0066CC', paddingHorizontal: 20, paddingVertical: 24 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: '#B3D9FF' },
  listContent: { paddingHorizontal: 16, paddingVertical: 16 },
  loader: { marginVertical: 20 },
  error: { color: '#EF4444', textAlign: 'center', marginBottom: 16, fontWeight: 'bold' },
  cardWrapper: { marginBottom: 12 },
  card: { borderRadius: 12, elevation: 1, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#D1E3F0' },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  cardIconContainer: { width: 48, height: 48, borderRadius: 10, backgroundColor: '#E6F0FF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#003D99', marginBottom: 4 },
  cardPrice: { fontSize: 14, color: '#0066CC', fontWeight: '600' },
  cardActions: { justifyContent: 'space-between', paddingTop: 12 },
  editButton: { backgroundColor: '#0066CC', borderRadius: 8, flex: 1, marginRight: 8 },
  deleteButton: { borderColor: '#EF4444', borderRadius: 8, flex: 1, borderWidth: 1 },
  deleteButtonLabel: { color: '#EF4444' },
  buttonLabel: { fontWeight: '600' },
  fab: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#0066CC', borderRadius: 12 },
  fabLabel: { fontWeight: '600', fontSize: 14 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50, paddingHorizontal: 20 },
  emptyText: { marginTop: 16, fontSize: 16, color: '#5A7A8C', marginBottom: 20 },
  createButton: { backgroundColor: '#0066CC', borderRadius: 8 },
});

export default ProductList;
