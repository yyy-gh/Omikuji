document.addEventListener('DOMContentLoaded', () => {
    const drawBtn = document.getElementById('draw-btn');
    const resultArea = document.getElementById('result-area');
    const fortunePaper = document.getElementById('fortune-paper');
    const resultText = document.getElementById('result-text');
    const handIcon = document.getElementById('hand-icon');
    
    const fortunes = ['大吉', '中吉', '凶'];

    drawBtn.addEventListener('click', () => {
        // 連打防止のためボタンを無効化
        if (drawBtn.disabled) return;
        
        drawBtn.disabled = true;
        drawBtn.innerHTML = '<span>おみくじを引いています...</span>';
        
        // 以前の表示をリセット
        resultArea.classList.remove('drawing-active', 'great-glow');
        fortunePaper.classList.remove('show-paper');
        resultText.classList.remove('great', 'bad');
        resultText.innerText = '？';
        
        // 手の絵文字を「パー（探る手）」にして、向きもリセットしてスタート
        handIcon.innerText = '✋';
        handIcon.style.transform = 'rotate(180deg) scaleX(-1)';
        
        // リフロー処理（アニメーションを再度適用するためのテクニック）
        void resultArea.offsetWidth;
        
        // アニメーション開始（手が箱に入って探る）
        resultArea.classList.add('drawing-active');
        
        // 手が箱に入ってゴソゴソするタイミング（約1.5秒後）で
        // 握り拳に変えて、くじを掴んだことを表現
        setTimeout(() => {
            handIcon.innerText = '✊';
        }, 1500);

        // 手が箱から出てきて画面上部に到着した時（2.5秒後）に、おみくじをオープン
        setTimeout(() => {
            // ランダムに結果を抽出
            const index = Math.floor(Math.random() * fortunes.length);
            const result = fortunes[index];
            
            // 手は '✊' のまま、しっかりとくじを持った状態を維持する
            // 角度も箱に入れる時と同じ（下向き）にリセット
            handIcon.innerText = '✊';
            handIcon.style.transform = 'rotate(180deg) scaleX(-1)';
            
            // 結果のテキストをセットして装飾
            resultText.innerText = result;
            if (result === '大吉') {
                resultText.classList.add('great');
                // 大吉確定時は後ろも光る演出
                resultArea.classList.add('great-glow');
            } else if (result === '凶') {
                resultText.classList.add('bad');
            }
            
            // 紙をシュッと展開する
            fortunePaper.classList.add('show-paper');
            
            // ボタンを再度有効化
            drawBtn.disabled = false;
            drawBtn.innerHTML = '<span>もう一度引く</span>';
        }, 2500); // 2.5秒待機
    });

    // === モーダルの制御 ===
    const policyBtn = document.getElementById('policy-btn');
    const policyModal = document.getElementById('policy-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // モーダルを開く
    if(policyBtn) {
        policyBtn.addEventListener('click', () => {
            policyModal.classList.remove('hidden');
        });
    }

    // モーダルを閉じる（バツボタン）
    if(modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            policyModal.classList.add('hidden');
        });
    }

    // モーダル外の暗い背景部分をクリックしても閉じる
    if(policyModal) {
        policyModal.addEventListener('click', (e) => {
            if (e.target === policyModal) {
                policyModal.classList.add('hidden');
            }
        });
    }
});
