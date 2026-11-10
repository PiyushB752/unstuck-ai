type ActionCardProps = {
  blocker: string;
  action: string;
  reason: string;
  time: string;
  completed: boolean;
  onComplete: () => void;
  onDifferent: () => void;
  onReset: () => void;
  onNext: () => void;
};

export default function ActionCard({
  blocker,
  action,
  reason,
  time,
  completed,
  onComplete,
  onDifferent,
  onReset,
  onNext,
}: ActionCardProps) {
  return (
    <div className="mt-8 rounded-2xl border border-[#E3E7DE] bg-white p-6 sm:p-8">
      <p className="text-xs font-semibold tracking-widest text-[#829078]">
        YOUR NEXT STEP
      </p>

      {!completed ? (
        <>
          <h3 className="mt-4 text-2xl font-semibold">
            Let's make things simpler.
          </h3>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-medium text-gray-400">
                MAIN BLOCKER
              </p>
              <p className="mt-2 text-sm">{blocker}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-400">
                YOUR ACTION
              </p>
              <p className="mt-2 text-lg font-medium">{action}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-400">
                WHY THIS HELPS
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {reason}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-400">
                ESTIMATED TIME
              </p>
              <p className="mt-2 text-sm">{time}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onComplete}
              className="flex-1 rounded-xl bg-[#68785F] px-5 py-4 text-sm font-medium text-white hover:bg-[#53634C]"
            >
              Mark as done ✓
            </button>

            <button
              onClick={onDifferent}
              className="flex-1 rounded-xl border border-[#DDE2D7] px-5 py-4 text-sm font-medium hover:bg-[#F8F8F5]"
            >
              Different suggestion
            </button>
          </div>
        </>
      ) : (
        <div className="mt-5">
          <h3 className="text-2xl font-semibold">
            Nice work. One step at a time.
          </h3>

          <p className="mt-3 text-sm text-gray-500">
            You've completed this action. Ready for another small step?
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onNext}
              className="flex-1 rounded-xl bg-[#68785F] px-6 py-3 text-sm font-medium text-white hover:bg-[#53634C]"
            >
              Find my next step →
            </button>

            <button
              onClick={onReset}
              className="flex-1 rounded-xl border border-[#DDE2D7] px-6 py-3 text-sm font-medium hover:bg-[#F8F8F5]"
            >
              Start a new problem
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
