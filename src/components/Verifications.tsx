import { Verification } from "../types";
import { Switch } from "./Switch";

interface Props {
  verifications: Verification[];
  onChange: (v: Verification[]) => void;
}

export const Verifications: React.FC<Props> = ({ verifications, onChange }) => {
  const handleChange = (vIndex: number, cIndex: number, value: boolean) => {
    // if two keys of an object has reference to same object,
    // then structuredClone makes sure both of the keys still have same refrence (to new object)
    // const v = structuredClone(verifications);

    // v[vIndex].eligibility.checks[cIndex].passed = value;

    // fix 2
    // because of the above explained behaviour of the structuredClone we must make a copy of condition object
    const condition = verifications[vIndex].eligibility.checks[cIndex];
    verifications[vIndex].eligibility.checks[cIndex] = {
      ...condition,
      passed: value,
    };

    onChange(verifications);
  };

  return (
    <>
      {verifications.map((verification, vIndex) => {
        return (
          <div key={vIndex} className="mt-6">
            <div className="text-xs px-3 py-1 bg-white rounded-full mb-1 font-medium text-neutral-400 inline-block">
              {" "}
              Verification Source: {verification.source}
            </div>
            <div className="flex flex-wrap">
              {verification.eligibility.checks.map((condition, cIndex) => {
                return (
                  <div className="p-px w-1/2" key={condition.name}>
                    <div
                      key={condition.name}
                      className="flex flex-col bg-white p-4 rounded-lg"
                    >
                      <p className="text-sm font-medium text-neutral-700 mb-1 -mt-1">
                        {condition.label}
                      </p>
                      <Switch
                        checked={condition.passed}
                        onChange={() => {
                          handleChange(vIndex, cIndex, !condition.passed);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
