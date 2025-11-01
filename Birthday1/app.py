from flask import Flask, render_template, jsonify
from datetime import datetime

app = Flask(__name__)


@app.route('/')
def birthday_page():
    # Calculate Anmol's age
    birth_date = datetime(2006, 11, 14)
    today = datetime.now()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))

    birthday_data = {
        'name': 'Anmol',
        'crush_name': 'Jin',
        'age': age,
        'my_name': 'Jaweria',
        'fav_colors': ['#667eea', '#764ba2']  # Blue and Purple
    }

    return render_template('birthday.html', **birthday_data)


@app.route('/get_birthday_message')
def get_birthday_message():
    message = {
        'title': "🎂💌 Happy Birthday to My Forever Best Friend 💌🎂",
        'content': """From the first day we met in school to the last day of college, we've written a story that I'll cherish forever. We've shared secrets, dreams, laughter, and even tears — and through every phase of growing up, you've been the one constant that made everything brighter. ✨

I still remember our silly jokes in class, the endless talks after school, our late-night study sessions that always turned into gossip, and those unplanned adventures that made our school and college life unforgettable. You weren't just my best friend — you became my second home, my comfort person, my safe space. 💕

Even though we're miles apart now, not a single day goes by that I don't think about you. Distance has only reminded me how strong our bond truly is. I miss your laugh, your voice, your random messages that could make any bad day better. Sometimes, I scroll through our old pictures and messages just to feel a little closer to you again. 🥺💫

You've grown into such a beautiful, kind, and strong person — and I'm so proud of you, always. You deserve all the happiness, love, and success in this world. I may not be there to hug you in person, but my heart is celebrating with you today. 🎈

Thank you for being my constant support, for understanding me in ways no one else can, and for loving me even when I'm at my worst. You're more than a best friend — you're family. ❤️

So here's to us — to all the memories we've made and the ones we'll create when we meet again. No matter how far life takes us, you'll always be my person, my favorite human, my forever friend.

Happy Birthday, my soul sister.
May your day be filled with love, laughter, and a reminder that distance can never separate hearts that care this deeply. 💖✨"""
    }
    return jsonify(message)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)