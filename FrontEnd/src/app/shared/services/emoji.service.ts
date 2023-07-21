import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })

export class EmojiService {

    public getEmoji(emoji: string): string {
        switch (emoji) {
            case 'wildcard': return '⭐'
            case 'remarks': return '🔔'
            case 'null': return '🚫'
            case 'error': return '❌'
            case 'green-circle': return '🟢'
            case 'yellow-circle': return '🟡'
            case 'red-circle': return '🔴'
        }

    }

}
