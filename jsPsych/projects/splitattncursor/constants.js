const TEMPLATE_CONTENT = {
  implied_consent_questionnaire: `
        <div class="consent">
        <h1>Online Implied Consent for Participants</h1>
           <ul>
           <li>I have read the information contained in the Information Sheet for Participants and any questions I have asked have been answered to my satisfaction.</li>
           <li>I agree to participate in this study, with the understanding that: </li>
           <ul>
           <li>My participation is voluntary,</li>
            <li>My contribution is anonymous,</li>
             <li>Information concerning my identity will not be collected, and,</li>
              <li>I may withdraw at any time without consequences & without follow-up.	</li>
           </ul>
           <li>
           I agree that the anonymized research data collected for the study may be published in an open data set, journal article, book chapter, or presented at conferences at a later date.
           </li>
           <li>I agree that I may be quoted using a pseudonym.</li>
           <li>I am 18 years of age or older.</li>
           <li>In preservation of anonymity, I understand that no name or signature is required of me to give consent in this online setting. By clicking the button below, I am agreeing to the above and also to participate in this study.</li>
           </ul>
           <p><strong>REMINDER:</strong> This experiment will take approximately 45 minutes to complete.</p>
           </div>`,
  info_sheet: ` <div class="info-sheet"><p>
           <div class="flex">
           <div class="une-logo">
           <img src="img/unelogo.svg" width = "15%"></img>
           </div>
           <div><p id="letterhead">
           School of Education<br/>
University of New England<br/>
Armidale NSW 2351<br/>
Australia<br/>
1800 818 865<br/>
https://www.une.edu.au/about-une/faculty-of-humanities-arts-social-sciences-and-education/school-of-education
<p>

           </div>
           </div>
    <h3>Information Sheet for Participants</h3>
    <h2>EFFECTIVE STRATEGIES FOR LEARNING FROM COMPLEX MATERIALS.</h2>
           
           <div id="HREC-approval"><strong>Approval:</strong> This project has been approved by the Human Research Ethics Committee of the University of New England (Approval No. HE-2025-2232-2756., Valid to 18/03/2026).</div>
    <h3>What is the purpose of this Research?</h3>
    <p>The research aims to explore effective strategies for studying complex materials in an online environment. </p>
    <h3>What am I expected to do if I volunteer to participate?</h3>
    <p>If you volunteer to be included in this study, you'll be asked to complete an experiment that will take approximately 45 minutes to complete. As part of this experiment you'll be asked to complete a cogntive test in the form of a game, complete a short pre-test, then study some complex learning materials for about 12 minutes, then complete a test to see what you learned.</p>
    
    <h3>Who are the Researchers?</h3>
     <p>Please contact any of the following researchers, should you have any questions about this study.</p>
    <div class="flex">
         <div class="researcher-image">
            <img src="img/stoosmall.jpg">
        </div>
   
   <div class="researcher-contact">
    <p>Dr. Stoo Sepp<br>
    Senior Lecturer, Digital Technologies for Education<br>
    School of Education<br>
    <a href="mailto:stoo.sepp@une.edu.au">stoo.sepp@une.edu.au</a><br>
    +61 2 6773 1643</p>
    </div>
    </div>
    <h3>Is my Participation Voluntary?</h3>
    <p>Your involvement in this study is completely voluntary and it is your right to stop participating in the study at any time without consequence and without needing to provide an explanation, however, once you begin the survey your anonymous data which you have already provided cannot be withdrawn. Participation will in no way impact your marks or results in this unit.</p>
    <h3>What are the benefits of participating in this Research?</h3>
    <p>As more and more classes are offered online, and more and more learning materials are presented digitally, the findings from this study can help to inform students how to study more complex learning materials when they may not have access to a pen or pencil to highlight key concepts or take notes. This study will also inform the design of such materials to support learning in a digital environment.
    <h3>What are the possible risks, inconveniences and discomforts if I volunteer to partiicpate?</h3>
    <p>It is unlikely that this research will raise any personal or upsetting issues but if it does, you may wish to contact UNE Student Wellness Centre on 1300 661 927 or  or Lifeline on 13 11 14.</p>
    <h3>How will my contributions to this study be used?</h3>
    <p>Results in the form of anonymized and de-identified data may be used in published academic journal articles, conference presentations or book chapters after the researcher has concluded their research. The researcher also plans to publish an open data set so that other researchers may explore the results and learn from them.</p>
    <h3>How is my Privacy Protected?</h3>
    <p>Any personally identifiable information gathered in the course of the study will remain confidential. No individual will be identified by name in any publication of the results. At all times, the researcher will safeguard your identity by presenting the information in a way that will not allow you to be identified. If any member of the research team listed above is a part of your instructional staff in a unit of study you are engaging in, their access to your responses to the survey will be locked until after all marks and results for this unit have been submitted. This will ensure that your marks for each assignment and your final results will in no way be affected by your choice to participate in this study or the responses you provide in the course of your participation.</p>
    <h3>Ethics review and complaints</h3>
    <p>Should you have any complaints concerning the manner in which this research is conducted, please contact the Human Research Ethics Officer, Research Services, University of New England on (02) 6773 1115 or email <a href="mailto:humanethics@une.edu.au">humanethics@une.edu.au</a>.</p>
    <div  id="HREC-approval">
    <h3>Data Storage and Disposal</h3>
    <p>The researchers will keep all hardcopy notes related to this study in a locked cabinet in my office at the University of New England’s School of Education. Any electronic data will be kept on cloud.une.edu.au, UNE’s centrally managed cloud server managed by the research team. It will also be kept on a password protected computer in the same location. Only the research team will have access to the data. All the data collected in this research will be kept for a minimum of five years after completion of the study, after which it will be disposed of by deleting relevant computer files, and destroying or shredding hardcopy materials.</p>
    </div>
    <p>If you would like to participate, please click the link below to begin.</p>
    <p>Thank you for your interest in this study.</p></div>`,
  pretest_instructions: `<p>Thank you for playing through that game.</p>
    <p>Next, you’ll complete a brief quiz of twelve multiple-choice questions regarding the human nervous system to determine how much you know about the topic. The quiz consists of two parts: the first four questions assess your understanding of the background information, and the rest of the questions measure your pre-existing knowledge on the topics we will provide you with during this session. </p>
    <p>Please take your time and make sure you read every question carefully before you answer. Every question has four possible answers. Only one answer is correct, so please answer honestly.</p>
    <p>The last eight questions are quite difficult for people that have never learned about biochemical processes in the brain before. It quite normal if you can’t answer any of these eight questions correctly, because it just means you haven’t learned about the topic yet.</p>
    <p>We thank you for your efforts! </p>
    <p>The quiz when you click the start button below. Good Luck! </p>
`,
instructionsp1:`<h3>Well Done!</h3><p>Though it may have been challenging, your efforts on that quiz are appreciated. Next you're going to learn a little bit about the brain before you study it in detail.</p><p>Humans receive information from around them through their nervous system. This information is transmitted to the brain for processing through special nerve cells called neurons.</p><p>On the next  page, you will find an introduction to neurons and their general function. Read the material at your own pace.</p> 
<p>Click the ''Next'' button below to get started.</p>
`,
instructionsp2:`<p>Neurons are long cells that typically receive a signal (an electric nerve impulse) at one end and send it on to the other end. These connect to each other to send signals throughout the body, for example, from your finger to your brain. At one end there are dendrites, which receive incoming information. The neuron sends a signal through the axon to the end of the cell – a place called the axon terminal, which sends the signal onto the next neuron.</p><p>When a signal arrives at the axon terminal, it needs to be passed on to the next neuron. However, neurons are not physically connected to one another. They transfer information through a synapse, which consists of a small gap (synaptic cleft) between the axon terminal of an information sending neuron (presynaptic neuron) and the surface of a receiving neuron (postsynaptic cell).</p><img class="neuron-image" src="img/neurondiagram.png">
`,
};
