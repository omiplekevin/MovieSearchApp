import { StyleSheet, Dimensions } from 'react-native';


const { width } = Dimensions.get('window');
const itemSpacing = 12;
const itemWidth = (width - itemSpacing * 3) / 2;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8
    },

    input: {
        fontSize: 20,
        height: 52,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 12,
    },

    item: {
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginBottom: 8,
    },

    card_container: {
        position: 'relative'
    },

    card_title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#e5e5e5ff',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        padding: 8,
        zIndex: 2,
    },

    errorText: {
        color: 'red',
        textAlign: 'center',
    },

    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },

    gridItem: {
        width: itemWidth,
        height: 300,
        marginBottom: itemSpacing,
        marginHorizontal: itemSpacing / 2,
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    poster: {
        zIndex: 0,
        width: '100%',
        height: '100%',
    },

    info: {
        padding: 8,
    },

    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100, // controls how tall the fade is
        justifyContent: 'flex-end',
        padding: 10,
    },

    heartContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 20,
        padding: 4,
    },
});