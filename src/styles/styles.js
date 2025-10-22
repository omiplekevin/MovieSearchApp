import { StyleSheet, Dimensions } from 'react-native';


const { width } = Dimensions.get('window');
const itemSpacing = 12;
const itemWidth = (width - itemSpacing * 3) / 2;

export const styles = StyleSheet.create({

    h1: { fontSize: 32, },
    h2: { fontSize: 28, },
    h3: { fontSize: 24, },
    h4: { fontSize: 20, },
    h5: { fontSize: 16, },
    h6: { fontSize: 14, },

    center: { alignSelf: 'center', },

    cardContainer: {
        position: 'relative'
    },

    cardTitle: {
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

    container: {
        flex: 1,
        padding: 8
    },

    detailContainer: {
        padding: 16,
    },

    detailTitle: {
        fontWeight: '500',
        color: '#020020',
    },

    detailRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 12
    },

    detailTextLight: {
        color: '#020020',
    },

    detailTextNormal: {
        fontWeight: '400',
        color: '#020020',
    },

    detailTextSemiHeavy: {
        fontWeight: 'bold',
        color: '#020020',
    },

    detailTextHeavy: {
        fontSize: 16,
        fontWeight: '900',
        color: '#020020',
    },

    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,1)',
    },

    errorText: {
        color: 'red',
        textAlign: 'center',
    },

    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 150,
        justifyContent: 'flex-end',
        padding: 16,
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

    heartContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 2,
        backgroundColor: 'rgba(44, 44, 44, 0.8)',
        borderRadius: 20,
        padding: 4,
    },

    info: {
        padding: 8,
    },

    input: {
        fontSize: 20,
        height: 52,
        borderColor: '#ccc',
        borderWidth: 2,
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

    pageHeader: {
        fontSize: 64,
        padding: 16,
        color: '#000',
    },

    poster: {
        zIndex: 0,
        width: '100%',
        height: '100%',
    },

    posterHeader: {
        width: '100%',
        height: 512,
    },

    roundedBackground: {
        backgroundColor: 'rgba(0,0,0,1)',
        borderRadius: 8,
        padding: 8
    },

    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
});