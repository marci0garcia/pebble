import { audiowide } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${audiowide.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[44px]">Pebble</p>
    </div>
  );
}