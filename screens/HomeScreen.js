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

import { useEffect, useState } from 'react'
import TrendingMovie from '../components/TrendingMovie'
import MovieList from '../components/MovieList'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import {
    fetchTopRatedMovies,
    fetchTrendingMovies,
    fetchUpcomingMovies,
} from '../api/moviedb'

const ios = Platform.OS === 'ios'
const HomeScreen = () => {
    const navigation = useNavigation()
    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getTrendingMovies()
    }, [])
    useEffect(() => {
        getUpcomingMovies()
    }, [])
    useEffect(() => {
        getTopRatedMovies()
    }, [])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies()
        if (data && data.results) setTrending(data.results)
        setLoading(false)
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies()
        if (data && data.results) setUpcoming(data.results)
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies()
        if (data && data.results) setTopRated(data.results)
    }

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

            {loading ? (
                <Loading />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 10 }}
                >
                    {trending.length > 0 && <TrendingMovie data={trending} />}
                    {upcoming.length > 0 && (
                        <MovieList title='Upcoming' data={upcoming} />
                    )}
                    {topRated.length > 0 && (
                        <MovieList title='Top Rated' data={topRated} />
                    )}
                </ScrollView>
            )}
        </View>
    )
}
export default HomeScreen
