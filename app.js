let currentTab = 'seo';

window.switchTab = (tab) => {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const uploadZone = document.getElementById('uploadZone');
    if(tab === 'thumb') uploadZone.classList.remove('hidden');
    else uploadZone.classList.add('hidden');
};

document.getElementById('generateBtn').addEventListener('click', async () => {
    const idea = document.getElementById('videoIdea').value;
    if(!idea) return alert('Enter a video idea first.');

    const loader = document.getElementById('loader');
    const outputContainer = document.getElementById('outputContainer');
    const resultText = document.getElementById('resultText');
    
    loader.classList.remove('hidden');
    outputContainer.classList.add('hidden');

    try {
        let result = "";
        
        // --- API INTEGRATION STUBS ---
        if (currentTab === 'seo') {
            // Placeholder for YouTube Data API v3 integration
            result = `[SEO METADATA GENERATED FOR: ${idea}]\n\nKeywords: Tech, Gaming, ${idea.split(' ')[0]}, Viral, 2026\nTags: #${idea.replace(/\s+/g, '')} #Trending #CreatorOS\nTitle Optimization: "The TRUTH about ${idea}..."`;
        } 
        else if (currentTab === 'script') {
            // Placeholder for Gemini 1.5 Flash API integration
            result = `[SCRIPT OUTLINE VIA GEMINI 1.5 FLASH]\n\n[HOOK 0:00-0:15]\n"Stop scrolling. If you've been struggling with ${idea}, this video will change everything..."\n\n[INTRO 0:15-1:00]\nEstablish authority and promise the result.\n\n[MAIN BODY 1:00-5:00]\nStep 1: The Basics\nStep 2: The Secret Method\nStep 3: Execution\n\n[OUTRO 5:00+]\nCall to action for likes and subs.`;
        } 
        else if (currentTab === 'thumb') {
            // Placeholder for Midjourney Master Prompt & Pollinations.ai preview
            const formattedIdea = encodeURIComponent(`Cinematic youtube thumbnail for ${idea} neon lighting 8k`);
            result = `[MASTER PROMPT ENGINE]\n\nMidjourney Prompt: /imagine prompt: high contrast Youtube thumbnail for ${idea}, cyberpunk aesthetics, neon colors, unreal engine 5 render, 8k resolution --ar 16:9 --v 6.0\n\n[POLLINATIONS PREVIEW URL]\nhttps://image.pollinations.ai/prompt/${formattedIdea}`;
        }

        // Simulate network delay
        await new Promise(r => setTimeout(r, 2000));

        resultText.innerText = result;
        loader.classList.add('hidden');
        outputContainer.classList.remove('hidden');

        // Note: Call function to save to Firebase here
        if (window.saveToVault) {
            window.saveToVault({ type: currentTab, idea: idea, output: result, timestamp: Date.now() });
        }

    } catch (error) {
        alert("API Error: " + error.message);
        loader.classList.add('hidden');
    }
});

document.getElementById('downloadBtn').addEventListener('click', () => {
    const text = document.getElementById('resultText').innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PenTube_Export_${Date.now()}.txt`;
    a.click();
});