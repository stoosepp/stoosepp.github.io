const TEMPLATE_CONTENT = {
  implied_consent_questionnaire: `
        <div class="consent">
        <h1>PARTICIPANT CONSENT FORM</h1>
           <h2>Project: Mouse Cursors to Support Anatomy Learning</h2>
           <h2>BRIEF SUMMARY OF PROJECT</h2>
           <p>You are invited an experimental study about the use of mouse cursors to support learning digital materials. While most of the research studies have focused on paper-based materials using participants physical hands as study aids, only very few studies have extended this to the computer use of 'proxy hands' - mouse cursors. The aims of the project are to investigate if using mouse cursors when studying digital materials is beneficial or not.</p>
           <p><strong>In order to participate in this study, we need to ensure that you understand the nature of the research, as outlined on the Participant Information Sheet. Please tick the boxes to indicate that you understand and agree to the following conditions.</strong></p>
           <p><strong>REMINDER:</strong> This experiment will take approximately 45 minutes to complete.</p>
           </div>`,

  info_sheet: ` <div class="info-sheet">
         
    <h1>PARTICIPANT INFORMATION SHEET</h1>
    <h2>Project: Mouse Cursors to Support Anatomy Learning</h2>
     
    <h3>STUDY BACKGROUND</h3>
           
  <p>You are invited to take part in a research study on the use of mouse cursors to support the learning of anatomy which is led by Dr Stoo Sepp in the School of Education Culture & Society at Monash University and Dr Mona Wong in the Department of Psychology and Counselling at Birmingham City University. The project has been approved by both Monash University Human Research Ethics Committee and the BCU Health and Life Sciences Research Ethics Committee.</p>

  <h3>WHAT WILL YOU NEED TO DO?</h3>
  <p>If you agree to take part, you will be asked to complete an online experiment which includes collection of demographic information (age, gender and learning disciplines); a pre-test to assess prior knowledge of human anatomy; then you will be directed to the Della Sala's Visual Pattern Task to measure visuospatial working memory. Afterwards, you will be randomly assigned to one of the 3 experimental groups - no mouse interaction, mouse interaction with arrow cursor and mouse interaction with hand cursor, and to learn about the heart functions. Upon the completion, you will complete a short questionnaire to measure their mental effort spent on learning (e.g., how much mental effort that you spent on the task), and a post test. The whole experiment will take about 25-30 minutes. Some of the pre and post-test questions include:<br/>
  The ribs are attached to the spine and meet in front of the body at the:
</p>
<ul>
  <li>skull</li>
  <li>limbs</li>
  <li>joints</li>
  <li>breastbone</li>
  </ul>
  <h3>WHO CAN TAKE PART?</h3>
  <p>To participate in the study, you must be over 18-year-old, studying at a university and have good level of English to understand the consent form and learning content.
Please consider whether you find these topics about online learning, heart functions, or using mouse cursors distressing or upsetting. If so, you are encouraged not to take part.
</p>
  <h3>ARE THERE ANY RISKS OR BENEFITS IN TAKING PART?</h3>
    <p>Potential risk for physically harm to participants or third parties is minimal as this research is online. There is minimal direct contact between the researchers and participants or any third parties. However, there is the risk of stress when learning about hearts or biology content online. Please consider whether you find these topics about online learning, heart functions, or using mouse cursors distressing or upsetting. If so, you are encouraged not to take part.”
If you are a BCU student, you can obtain up to 6 RPS credits for participating in this study.
</p>
  <h3>DO I HAVE TO TAKE PART & CAN I WITHDRAW? </h3>
    <p>In line with the regulations outlined by the British Psychological Society, participation is completely voluntary. You can skip any questions if you’d prefer not to answer, and can stop at any time during the study by closing your browser window. After completing the study, you can withdraw your data up until 15 Sept 2027 by emailing the researcher with your Unique ID code.</p>
  <h3>HOW WILL MY DATA BE KEPT CONFIDENTIAL?</h3>
    <p>Your responses will be completely anonymous and compliant with GDPR, Data Protection Act 2018, and University’s Data Protection Policy, and there will be no collection of any personal information other than your age, gender and learning discipline. Data will be stored securely on encrypted server at Monash University, and accessed only by Dr Stoo Sepp, but may be subjected to audit and verification processes.
The data will be securely stored for 5 years, after which point it will be destroyed. 
</p>
  <h3>SUPPORT SERVICES</h3>
    <p>If you are affected by any of the topics raised in this study, please reach out to:</p>
    <p><strong>Mind</strong></p>
    <p>This service provides advice and support to empower anyone experiencing a mental health problem, you can contact them 24/7. <br/>
Website: <a href="https://www.mind.org.uk/" target="_blank">https://www.mind.org.uk/</a><br/>
Helpline: 0300 123 3393<br/>
Email: <a href="mailto:info@mind.org.uk">info@mind.org.uk</a></p>

 <p><strong>Shout</strong></p>
    <p>Shout is a free, confidential and 24/7 text messaging service for anyone in the UK who needs support.  <br/>

TEXT: 85258<br/>
Website: <a href="https://giveusashout.org/" target="_blank">https://giveusashout.org/</a><br/></p>

<p><strong>BCU Mental Health and Wellbeing Team </strong></p>
<p>For BCU Students, you can access support from the BCU Mental Health and Wellbeing Team at any time<br/>
Website: <a href="https://icity.bcu.ac.uk/student-affairs/health-and-wellbeing/mental-health-and-wellbeing." target="_blank">https://icity.bcu.ac.uk/student-affairs/health-and-wellbeing/mental-health-and-wellbeing.</a> <br/>
Helpline: 0121 331 5188<br/>
Email: <a href="mailto:wellbeing@bcu.ac.uk">wellbeing@bcu.ac.uk</a>   <br/></p>

<h3>KEY CONTACTS</h3>
<p>You can contact the researchers by email at <a href="mailto:mona.wong@bcu.ac.uk">mona.wong@bcu.ac.uk</a> or <a href="mailto:Stoo.Sepp@monash.edu">stoo.sepp@monash.edu</a> if you require further information or wish to exercise your right to withdraw.</p>
<p>If you are unhappy at any point in the study, or if there is a problem, please contact the Health and Life Sciences Research Ethics Committee directly at <a href="mailto:SGREIC_HealthLifeSciences@bcu.ac.uk">SGREIC_HealthLifeSciences@bcu.ac.uk</a> </p>
<p>If you have any questions, comments or concerns about how we use or handle your information please contact the Data Protection Officer via email at <a href="mailto:dataprotectionofficer@monash.edu">dataprotectionofficer@monash.edu</a> or get more information from the website <a href="https://www.monash.edu/privacy-monash/data-protection-and-privacy-procedure-and-collection-statements.">https://www.monash.edu/privacy-monash/data-protection-and-privacy-procedure-and-collection-statements.</a> </p>

`,

  pretest_instructions: `<p>Dear participant,</p>
    <p>First, you’ll complete a brief quiz of 36 multiple-choice questions regarding the human nervous system to determine how much you know about the topic. The quiz consists of two parts: the first four questions assess your understanding of the background information, and the rest of the questions measure your pre-existing knowledge on the topics we will provide you with during this session. </p>
    <p>Please take your time and make sure you read every question carefully before you answer. Every question has four possible answers. Only one answer is correct, so please answer honestly.</p>
    <p>We thank you for your efforts! </p>
    <p>The quiz when you click the start button below. Good Luck! </p>
`,

debriefing: ` <div class="debriefing"><p><strong>Thank you for taking part in this study! Your time is really appreciated.</strong></p>
<h3>SUMMARY OF PROJECT</h3>
<p>The aim of this study was to investigate if using mouse cursors when studying digital materials is beneficial or not. The study was conducted by Dr Stoo Sepp in the School of Education Culture & Society at Monash University and Dr Mona Wong in the Department of Psychology and Counselling at Birmingham City University.</p>
<h3>WHAT HAPPENED IN THE STUDY?</h3>
<p>Finger pointing and tracing are a common strategy in teaching and learning. Based on the Cognitive Load Theory (CLT) and the concept of embodied cognition, these simple spatial gestures associate with, and can even change, how the human brain processes complex information. Two theoretical perspectives potentially explain the beneficial effects of pointing on learning. Previous studies have found that point and tracing can support learning of complex learning materials such as human anatomy (see Macken & Ginns, 2014; Korbach et al., 2020; Zhang et al., 2023). While most of the research studies have focused on paper-based materials using participants physical hands as study aids (e.g., Zou et al. 2023), only very few studies have extended this to the use of 'proxy hands' - mouse cursors that provide attentional guidance for learning with online / digital materials (see Zhang et al., 2023). The aims of the project are to investigate if the same benefits observed using human hands apply with mouse cursors when studying digital materials. </p>
 <h3>SUPPORT SERVICES</h3>
    <p>If you are affected by any of the topics raised in this study, please reach out to:</p>
    <p><strong>Mind</strong></p>
    <p>This service provides advice and support to empower anyone experiencing a mental health problem, you can contact them 24/7. <br/>
Website: <a href="https://www.mind.org.uk/" target="_blank">https://www.mind.org.uk/</a><br/>
Helpline: 0300 123 3393<br/>
Email: <a href="mailto:info@mind.org.uk">info@mind.org.uk</a></p>

 <p><strong>Mind</strong></p>
    <p>This service provides advice and support to empower anyone experiencing a mental health problem, you can contact them 24/7. <br/>
Website: <a href="https://www.mind.org.uk/" target="_blank">https://www.mind.org.uk/</a><br/>
Helpline: 0300 123 3393<br/>
Email: <a href="mailto:info@mind.org.uk">info@mind.org.uk</a></p>

 <p><strong>Mind</strong></p>
    <p>Shout is a free, confidential and 24/7 text messaging service for anyone in the UK who needs support.  <br/>

TEXT: 85258<br/>
Website: <a href="https://giveusashout.org/" target="_blank">https://giveusashout.org/</a><br/></p>

<p><strong>BCU Mental Health and Wellbeing Team </strong></p>
<p>For BCU Students, you can access support from the BCU Mental Health and Wellbeing Team at any time<br/>
Website: <a href="https://icity.bcu.ac.uk/student-affairs/health-and-wellbeing/mental-health-and-wellbeing." target="_blank">https://icity.bcu.ac.uk/student-affairs/health-and-wellbeing/mental-health-and-wellbeing.</a> <br/>
Helpline: 0121 331 5188<br/>
Email: <a href="mailto:wellbeing@bcu.ac.uk">wellbeing@bcu.ac.uk</a>   <br/></p>
<h3>RIGHT TO WITHDRAW</h3>
<p>Please note that you have the right to withdraw your data from this study up until 15th September 2027. To withdraw all you will need to do is email Dr Mona Wong or Dr Stoo Sepp using the Unique ID Code that you created at the start of this study and simply ask that your data be withdrawn. You can also email us to find out the results of this research. You will be provided with a summary of the findings, but we are not able to provide individual results or data relating to you or other participants.</p>

<h3>ANY MORE QUESTIONS?</h3>
<p>We hope that you enjoyed participating in this study. If you have any further questions, please feel free to contact the researchers at the address below.</p>
<p>Dr Mona Wong, Lecturer in Psychology, Department of Psychology and Counselling, Birmingham City University, <a href="mailto:mona.wong@bcu.ac.uk">mona.wong@bcu.ac.uk</a></p>
<p>Dr Stoo Sepp, Senior Lecturer, School of Educational Psychology and Inclusion, Faculty of Education, Monash University, <a href="mailto:Stoo.Sepp@monash.edu">Stoo.Sepp@monash.edu</a></p>
<p>If you are unhappy at any point in the study, or if there is a problem, please contact the Health and Life Sciences Research Ethics Committee directly at <a href="mailto:SGREIC_HealthLifeSciences@bcu.ac.uk">SGREIC_HealthLifeSciences@bcu.ac.uk</a> </p>
<p>If you have any questions, comments or concerns about how we use or handle your information please contact the Data Protection Officer via email at <a href="mailto:dataprotectionofficer@monash.edu">dataprotectionofficer@monash.edu</a> or get more information from the website <a href="https://www.monash.edu/privacy-monash/data-protection-and-privacy-procedure-and-collection-statements.">https://www.monash.edu/privacy-monash/data-protection-and-privacy-procedure-and-collection-statements.</a> </p>
<p>Please click the 'Complete' button below. When the Birmingham City University website opens, you may close your browser.</p></div>`,

};
