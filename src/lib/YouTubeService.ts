/**
 * 📺 YOUTUBE SERVICE - Lightweight Video Hub
 * Provides filtered YouTube content for Kids without heavy embeds.
 */

export interface VideoContent {
    id: string;
    title: string;
    thumbnail: string;
    channel: string;
    category: 'stories' | 'songs' | 'learning' | 'cartoons';
}

export class YouTubeService {
    // Safe-listed channels/content for kids
    private static SAFE_PLAYLISTS = {
        stories: [
            { id: 'L8E_f9s1tX0', title: 'Story of Prophet Yunus', channel: 'Zaky', category: 'stories' },
            { id: 'jVpYhX4Y7k8', title: 'Story of Prophet Ibrahim', channel: 'Zaky', category: 'stories' },
            { id: '6vYnNqT-asI', title: 'Prophet Yusuf Story', channel: 'Islamic Kids', category: 'stories' }
        ],
        songs: [
            { id: '7EGu0v6r5v4', title: 'Assalamu Alaikum', channel: 'Omar & Hana', category: 'songs' },
            { id: 'v_N7Y-w2QzU', title: 'Allah is Great', channel: 'Zaky', category: 'songs' }
        ],
        learning: [
            { id: '2D7G9m3_p0M', title: 'Learn Arabic Alphabet', channel: 'Islamic Kids', category: 'learning' },
            { id: '5q_vM3Q6wL4', title: 'How to make Wudu', channel: 'Zaky', category: 'learning' }
        ]
    };

    /**
     * Get filtered videos by category
     */
    static getVideos(category: keyof typeof YouTubeService.SAFE_PLAYLISTS): VideoContent[] {
        const videos = this.SAFE_PLAYLISTS[category] || [];
        return videos.map(video => ({
            ...video,
            thumbnail: `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`
        })) as VideoContent[];
    }

    /**
     * Get thumbnail URL for any YouTube ID
     */
    static getThumbnail(id: string, quality: 'mqdefault' | 'hqdefault' | 'maxresdefault' = 'mqdefault'): string {
        return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
    }

    /**
     * Generate Iframe URL with safety parameters
     */
    static getEmbedUrl(id: string): string {
        return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&modestbranding=1&rel=0`;
    }

    /**
     * Find a related video based on topic (AI helper)
     */
    static findRelatedVideo(topic: string): VideoContent | null {
        const allVideos = [...this.SAFE_PLAYLISTS.stories, ...this.SAFE_PLAYLISTS.songs, ...this.SAFE_PLAYLISTS.learning];
        const normalizedTopic = topic.toLowerCase();

        return allVideos.find(v =>
            v.title.toLowerCase().includes(normalizedTopic) ||
            normalizedTopic.includes(v.title.toLowerCase().split(' ').pop() || '')
        ) as VideoContent || null;
    }
}

export default YouTubeService;
