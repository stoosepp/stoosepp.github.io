////////RECALL QUESTIONS////////

const posttestRecall = [
  //General Concepts
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt: "What is the role of neurotransmitters?",
      options: [
        "To create resting potential",
        "To open ion channels",
        "To pump ions across membranes",
        "To break down synaptic cleft structure",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  //Inactive Synapse
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt: "What does the sodium-potassium pump do?",
      options: [
        "Pumps Na+ and K+ in equal amounts",
        "Pumps 3 Na+ out and 2 K+ in",
        "Pumps 2 Na+ out and 3 K+ in",
        "Allows passive movement of ions",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "In an inactive synapse, where is there a higher concentration of Na+?",
      options: [
        "Inside the neuron",
        "Outside the neuron",
        "Equally inside and outside the neuron",
        "In the synaptic cleft",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },

    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt: "Why does K+ want to flow out of the neuron?",
      options: [
        "Because it is positively charged",
        "Due to the sodium-potassium pump",
        "Because of the concentration gradient",
        "Due to the resting potential",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },

    answer_index: 2,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt: "What are leak channels?",
      options: [
        "Ion channels that only allow Na+ to move",
        "Ion channels that allow some K+ to flow out",
        "Pumps for K+ ions",
        "Closed ion channels",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 2,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt: "What is the typical resting potential of a neuron?",
      options: ["-70 mV", "0 mV", "+70 mV", "-50 mV"],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 0,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt: "What causes the membrane potential?",
      options: [
        "Flow of Na+ into the neuron",
        "Higher concentration of K+ inside the neuron",
        "Equal distribution of ions",
        "Active transport of Cl- ions",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  //Excited Synapse
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt: "What triggers the release of neurotransmitters at the synapse?",
      options: [
        "Inhibitory neurotransmitters",
        "Resting potential",
        "An electrical nerve impulse",
        "Ion gradients",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 2,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "In an excited synapse, what happens when neurotransmitters bind to ligand-gated ion channels?",
      options: [
        "Na+ flows into the neuron",
        "K+ flows out of the neuron",
        "Cl- flows into the neuron",
        "No ions flow",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 0,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt: "What is depolarisation?",
      options: [
        "Increase in negative charge inside the neuron",
        "Reduction in charge difference across the membrane",
        "Movement of K+ into the neuron",
        "Breakdown of neurotransmitters",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "What threshold must depolarisation reach to trigger voltage-gated Na+ channels?",
      options: ["-70 mV", "-50 mV", "0 mV", "+30 mV"],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt: "During depolarisation, which ion flows more significantly?",
      options: ["K+", "Na+", "Cl-", "Ca²+"],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "What happens to neurotransmitters after they’ve completed their job?",
      options: [
        "They remain in the synaptic cleft",
        "They are broken down and reabsorbed",
        "They flow back into the neuron",
        "They trigger more ligand-gated channels",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt: "What is an action potential?",
      options: [
        "The resting potential of -70 mV",
        "A flipping of the electrical charge in the neuron",
        "A constant flow of K+ out of the neuron",
        "A decrease in Na+ flow into the neuron",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  //Inhibitory Synapse
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt: "What is the purpose of inhibitory synapses?",
      options: [
        "To increase the likelihood of action potentials",
        "To reduce or stop action potentials",
        "To enhance neurotransmitter release",
        "To block all ion flow",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt: "Which neurotransmitters are released at inhibitory synapses?",
      options: [
        "Ligand neurotransmitters",
        "Excitatory neurotransmitters",
        "Inhibitory neurotransmitters",
        "Voltage-gated neurotransmitters",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 2,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "In an inhibitory synapse, what does the flow of K+ out of the cell cause?",
      options: [
        "Depolarisation",
        "Repolarisation",
        "Action potential generation",
        "Na+ inflow",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt: "What effect does Cl- inflow have on the neuron?",
      options: [
        "Makes the inside more positive",
        "Makes the inside more negative",
        "Has no effect",
        "Triggers depolarisation",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt: "What is the result of repolarisation?",
      options: [
        "The neuron becomes more likely to send signals",
        "The neuron cannot reach the voltage threshold",
        "The neurotransmitters are broken down",
        "Voltage-gated channels are opened",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt: "What prevents an action potential at an inhibitory synapse?",
      options: [
        "Depolarisation of the neuron",
        "Net negative charge inside the cell",
        "Flow of Na+ into the cell",
        "Neurotransmitter breakdown",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
];

////////TRANSFER QUESTIONS////////
const posttestTransfer = [
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "Muscle cramps are often caused by an imbalance of ions like Na+ and K+. Which process is most likely disrupted during a muscle cramp?",
      options: [
        "The movement of Cl- into the muscle cells",
        "The action of the sodium-potassium pump",
        "The opening of voltage-gated K+ channels",
        "The breakdown of neurotransmitters",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "A patient has a condition that increases the number of K+ leak channels in their neurons. What is the most likely consequence?",
      options: [
        "Neurons become more likely to fire action potentials",
        "Resting potential becomes more negative, inhibiting signals",
        "More neurotransmitters are released into the synaptic cleft",
        "Sodium-potassium pumps stop functioning",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "If a person’s neurons cannot release enough neurotransmitters, what might happen to their ability to move muscles?",
      options: [
        "Muscle movement would increase due to excessive action potentials",
        "Muscle movement would slow or stop due to lack of depolarisation",
        "Muscles would cramp from excessive K+ outflow",
        "Muscles would relax from increased resting potential",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "If the ligand-gated Na+ channels in a neuron are blocked, what would happen to the action potential process?",
      options: [
        "Na+ would flow in through other channels, maintaining normal function",
        "Depolarisation would not occur, preventing action potentials",
        "K+ would compensate, allowing depolarisation to occur",
        "The resting potential would become positive",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "Some toxins increase Cl- inflow into neurons. Based on the role of Cl-, what effect would this have on neuronal activity?",
      options: [
        "Increase the likelihood of action potentials",
        "Decrease the likelihood of action potentials",
        "Enhance neurotransmitter release",
        "Prevent neurotransmitter breakdown",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "Low potassium levels (hypokalemia) can cause muscle weakness. Which part of the synaptic process is likely impaired?",
      options: [
        "Na+ outflow through the sodium-potassium pump",
        "K+ outflow through leak channels",
        "Activation of ligand-gated Na+ channels",
        "Cl- inflow through inhibitory synapses",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "A patient exposed to a neurotoxin has neurons stuck at a depolarised state. What is most likely happening at the cellular level?",
      options: [
        "Voltage-gated Na+ channels remain open",
        "K+ leak channels are blocked",
        "Cl- inflow is excessive",
        "Sodium-potassium pumps are overactive",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 0,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "In a person with epilepsy, neurons fire too frequently. How might inhibitory synapses be involved?",
      options: [
        "Excessive K+ outflow prevents action potentials",
        "Insufficient inhibitory neurotransmitters reduce Cl- inflow",
        "Ligand-gated Na+ channels are blocked",
        "The sodium-potassium pump is overactive",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "Dehydration can reduce Na+ levels in the body. How might this affect nerve signalling?",
      options: [
        "Resting potential becomes more negative, reducing signal transmission",
        "Na+ inflow through voltage-gated channels increases",
        "Action potentials are more frequent",
        "K+ levels rise to compensate for low Na+",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 0,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "If a neurotransmitter responsible for depolarisation is deficient, what would most likely occur?",
      options: [
        "Signals would be transmitted too quickly",
        "Neurons would struggle to reach the threshold potential",
        "Resting potential would become less negative",
        "Voltage-gated K+ channels would open prematurely",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "A mutation causes sodium-potassium pumps to operate at half their normal rate. What would be the expected result?",
      options: [
        "Resting potential would be closer to 0 mV",
        "Increased likelihood of action potential firing",
        "Faster neurotransmitter breakdown",
        "Enhanced depolarisation",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 0,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "Some medications increase K+ outflow in neurons. How would this affect nerve signal transmission?",
      options: [
        "It would enhance depolarisation, increasing signal transmission",
        "It would make the cell more negative, reducing signal transmission",
        "It would increase neurotransmitter release",
        "It would block ligand-gated Na+ channels",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "A chemical prevents the breakdown of neurotransmitters in the synaptic cleft. What might this cause?",
      options: [
        "Overstimulation of the postsynaptic neuron",
        "Inhibition of action potential generation",
        "A stronger resting potential",
        "Blockage of ligand-gated K+ channels",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 0,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "High levels of K+ outside the cell (hyperkalemia) can disrupt nerve signaling. Why?",
      options: [
        "K+ inflow prevents Na+ channels from opening",
        "The concentration gradient for K+ outflow is reduced",
        "The resting potential becomes more positive, preventing action potentials",
        "Excessive depolarisation leads to constant firing",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 1,
  },
  {
    type: "jsPsychSurveyMultiChoice",
    questions: {
      prompt:
        "If a neuron’s voltage-gated Na+ channels fail to close after activation, what would happen?",
      options: [
        "Neurons would depolarise and remain positive",
        "Action potentials would stop entirely",
        "Resting potential would reset immediately",
        "K+ would compensate, preventing any changes",
      ],
      required: true,
      horizontal: false,
      button_label: "Next >",
    },
    answer_index: 0,
  },
];
