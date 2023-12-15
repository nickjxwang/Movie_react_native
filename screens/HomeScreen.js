import { StatusBar } from 'expo-status-bar'
import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    Bars3CenterLeftIcon,
    MagnifyingGlassIcon,
} from 'react-native-heroicons/outline'
import { styles } from '../theme'

import { useState } from 'react'
import TrendingMovie from '../components/TrendingMovie'
import MovieList from '../components/MovieList'
import { useNavigation } from '@react-navigation/native'

const ios = Platform.OS === 'ios'
const HomeScreen = () => {
    const navigation = useNavigation()
    const [trending, setTrending] = useState([1, 2, 3])
    const [upcoming, setUpcoming] = useState([1, 2, 3])
    const [topRated, setTopRated] = useState([1, 2, 3])
    return (
        <View className='flex-1 bg-neutral-800'>
            <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
                <StatusBar style='light' />
                <View className='flex-row items-center justify-between mx-4'>
                    <Bars3CenterLeftIcon
                        size='30'
                        strokewidth={2}
                        color='white'
                    />
                    <Text className='text-3xl font-bold text-white'>
                        <Text style={styles.text}>M</Text>ovie
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Search')}
                    >
                        <MagnifyingGlassIcon
                            size='30'
                            strokewidth={2}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
            >
                <TrendingMovie data={trending} />

                <MovieList title='Upcoming' data={upcoming} />

                <MovieList title='Top Rated' data={topRated} />
            </ScrollView>
        </View>
    )
}
export default HomeScreen
