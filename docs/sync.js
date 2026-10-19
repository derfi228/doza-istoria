// Синхронизация прогресса через Firebase: вход через Google, документ users/{uid} в Firestore.
// Без интернета Firestore копит изменения локально и отправляет их, когда сеть появится.
import {FIREBASE_CONFIG} from './firebase-config.js';

const V = '10.12.2';
const Sync = window.Sync = {ready: false, user: null, push() {}, signIn() {}, signOut() {}};

if (FIREBASE_CONFIG) {
  const [{initializeApp}, A, F] = await Promise.all([
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`),
  ]);
  const app = initializeApp(FIREBASE_CONFIG);
  const auth = A.getAuth(app);
  const db = F.initializeFirestore(app, {localCache: F.persistentLocalCache({tabManager: F.persistentMultipleTabManager()})});
  let ref = null, unsub = null, last = '';
  const write = state => { if (!ref) return; const s = JSON.stringify(state); if (s === last) return; last = s; F.setDoc(ref, {state: s}).catch(() => { last = ''; }); };

  Object.assign(Sync, {
    ready: true,
    push: state => write(state),
    signIn: async () => {
      const p = new A.GoogleAuthProvider();
      try { await A.signInWithPopup(auth, p); }
      catch (e) { if (['auth/popup-blocked', 'auth/operation-not-supported-in-this-environment'].includes(e.code)) A.signInWithRedirect(auth, p); }
    },
    signOut: () => A.signOut(auth),
  });

  A.onAuthStateChanged(auth, user => {
    unsub?.(); unsub = null; ref = null; last = '';
    Sync.user = user ? {email: user.email, name: user.displayName} : null;
    if (user) {
      ref = F.doc(db, 'users', user.uid);
      unsub = F.onSnapshot(ref, snap => {
        if (snap.metadata.hasPendingWrites) return;
        const remote = snap.exists() ? JSON.parse(snap.data().state) : {};
        const merged = window.onRemoteState(remote);
        if (JSON.stringify(merged) !== JSON.stringify(remote)) write(merged);
      });
    }
    window.onAuthChange?.();
  });
}
window.onAuthChange?.();
