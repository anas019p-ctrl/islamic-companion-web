/**
 * ðŸ“º YOUTUBE SERVICE - Lightweight Video Hub
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
            { id: 'F0396009yXU', title: 'Story of Prophet Yunus', channel: 'One4Kids', category: 'stories' },
            { id: 'U0gY1x1Fj1w', title: 'Story of Prophet Ibrahim', channel: 'One4Kids', category: 'stories' },
            { id: 'F7fXyM420_0', title: 'Prophet Yusuf Story', channel: 'Stories for Kids', category: 'stories' }
        ],
        songs: [
            { id: 'oV2K3158R9A', title: 'Assalamu Alaikum', channel: 'Omar & Hana', category: 'songs' },
            { id: 'eG41J0P4Kys', title: 'Allah Created Everything', channel: 'Zaky', category: 'songs' }
        ],
        learning: [
            { id: 't-b565gXQ60', title: 'Learn Arabic Alphabet', channel: 'Zaky', category: 'learning' },
            { id: 'Qn1eYpP725o', title: 'How to make Wudu', channel: 'Zaky', category: 'learning' }
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
