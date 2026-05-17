import Link from 'next/link';
import type { Review } from '@/lib/types';
import { scoreClass } from '@/lib/data';

const ILLUS: Record<string, string> = {
  tub: `<svg viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="20" width="40" height="44" rx="3" fill="#e7e3d7" stroke="#0a0a0a" stroke-width="1.5"/><rect x="8" y="16" width="48" height="10" rx="2" fill="#0a0a0a"/><rect x="18" y="36" width="28" height="2" fill="#0a0a0a" opacity=".2"/><rect x="18" y="41" width="20" height="2" fill="#0a0a0a" opacity=".2"/></svg>`,
  bottle: `<svg viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="24" y="8" width="16" height="10" rx="2" fill="#0a0a0a"/><path d="M14 28 Q14 22 24 22 L40 22 Q50 22 50 28 L50 68 Q50 72 46 72 L18 72 Q14 72 14 68Z" fill="#e7e3d7" stroke="#0a0a0a" stroke-width="1.5"/><rect x="20" y="42" width="24" height="2" fill="#0a0a0a" opacity=".2"/></svg>`,
  jar: `<svg viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="32" cy="24" rx="22" ry="8" fill="#0a0a0a"/><path d="M10 24 Q10 24 10 68 Q10 74 32 74 Q54 74 54 68 L54 24" fill="#e7e3d7" stroke="#0a0a0a" stroke-width="1.5"/><ellipse cx="32" cy="24" rx="22" ry="8" stroke="#0a0a0a" stroke-width="1.5" fill="none"/></svg>`,
  pouch: `<svg viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 14 L48 14 L52 24 L52 66 Q52 72 32 72 Q12 72 12 66 L12 24Z" fill="#e7e3d7" stroke="#0a0a0a" stroke-width="1.5"/><path d="M16 14 L48 14" stroke="#0a0a0a" stroke-width="3" stroke-linecap="round"/><rect x="20" y="36" width="24" height="2" fill="#0a0a0a" opacity=".2"/></svg>`,
  shaker: `<svg viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="6" width="20" height="12" rx="3" fill="#0a0a0a"/><path d="M14 22 Q12 22 12 28 L12 68 Q12 74 32 74 Q52 74 52 68 L52 28 Q52 22 50 22Z" fill="#e7e3d7" stroke="#0a0a0a" stroke-width="1.5"/><rect x="18" y="44" width="28" height="2" fill="#0a0a0a" opacity=".2"/></svg>`,
};

export default function ReviewCard({ review }: { review: Review }) {
  const sc = scoreClass(review.score);
  const rubric = review.rubric;
  const illus = ILLUS[review.illus] || ILLUS.tub;

  return (
    <Link href={`/reviews/${review.slug}/`} className="bcard" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
      {review.pick && (
        <span className="bcard-ribbon green">★ Editor&apos;s Choice</span>
      )}
      <div className="bcard-head">
        <div className="bcard-img" dangerouslySetInnerHTML={{ __html: illus }} />
        <div className="bcard-id">
          <div className="bcard-cat">{review.cat}</div>
          <h3 className="bcard-name">{review.brand}</h3>
          <div className="bcard-tag">{review.product}</div>
        </div>
        <div className={`bcard-score ${sc}`}>
          <span className="n">{review.score.toFixed(1)}</span>
          <span className="sub">/10</span>
        </div>
      </div>
      {rubric && (
        <div className="bcard-rubric">
          {Object.entries(rubric).map(([label, val]) => {
            const cls = (val as number) >= 8.5 ? 'hi' : (val as number) >= 7 ? 'mid' : 'lo';
            return (
              <div key={label} className="rb-row">
                <span className="rb-lbl">{label}</span>
                <span className="rb-val">{(val as number).toFixed(1)}</span>
                <div className="rb-bar"><i className={cls} style={{ width: `${(val as number) * 10}%` }} /></div>
              </div>
            );
          })}
        </div>
      )}
      <div className="bcard-foot">
        <div className="bcard-tags">
          {review.tags?.slice(0, 3).map((t, i) => {
            const label = typeof t === 'string' ? t : t.t;
            const cls = typeof t === 'object' && t.c ? ` ${t.c}` : '';
            return <span key={i} className={`tag${cls}`}>{label}</span>;
          })}
        </div>
        <span className="bcard-link">Analysis</span>
      </div>
    </Link>
  );
}
