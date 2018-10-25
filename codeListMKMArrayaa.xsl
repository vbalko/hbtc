<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ns1="urn:eon.cz/pi/mkm">
    <xsl:output omit-xml-declaration="yes" indent="yes"/>
    <xsl:strip-space elements="*"/>

<xsl:template match="//ns1:EON_MT_MKM_CodeList_Data_Register">
  <!--<xsl:variable name="cListName" select="substring(Response/CodeList/@codeListName,1,3)" />-->
  <root>      
      <xsl:apply-templates select="Response" />
      <token><xsl:value-of select="token" /></token>
  </root>
</xsl:template>

    

    <xsl:template match="CodeList[CodeName = 'MANDT']">      
      <xsl:variable name="cListName" select="CodeId" />
      <xsl:element name="{$cListName}" >
        <xsl:choose>
          <xsl:when test="CodeId = 'mkm_c_global_param'">    
            <KOD><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></KOD>
            <NAZEV><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></NAZEV>
            <HODNOTA><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></HODNOTA>
            <PRO_ISU><xsl:value-of select="following-sibling::CodeList[4]/CodeValue" /></PRO_ISU>
            <PRO_MKM><xsl:value-of select="following-sibling::CodeList[5]/CodeValue" /></PRO_MKM>            
          </xsl:when>        
          <xsl:when test="CodeId = 'mkm_c_skupina'">    
            <SKUPINA><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></SKUPINA>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
            <POPIS><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></POPIS>
          </xsl:when>
          <xsl:when test="CodeId = 'mkm_c_sep'">    
            <SEP><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></SEP>
            <SPARTYP><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></SPARTYP>
            <TXT><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></TXT>
          </xsl:when>
          <xsl:when test="CodeId = 'mkm_c_zavod'">    
            <WERKS><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></WERKS>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when>  
          <xsl:when test="CodeId = 'mkm_c_stanoviste'">    
            <WERKS><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></WERKS>
            <STORT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></STORT>
            <TXT><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></TXT>
          </xsl:when>  
          <xsl:when test="CodeId = 'mkm_c_prac_uziv'">    
            <WERKS><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></WERKS>
            <ARBPL><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></ARBPL>
            <STORT><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></STORT>
            <KID><xsl:value-of select="following-sibling::CodeList[4]/CodeValue" /></KID>
            <XMONTER><xsl:value-of select="following-sibling::CodeList[5]/CodeValue" /></XMONTER>
            <XMONTER_DEFAULT><xsl:value-of select="following-sibling::CodeList[6]/CodeValue" /></XMONTER_DEFAULT>   
            <XZPRACOVATEL><xsl:value-of select="following-sibling::CodeList[7]/CodeValue" /></XZPRACOVATEL>
            <XSKLADNIK><xsl:value-of select="following-sibling::CodeList[8]/CodeValue" /></XSKLADNIK>                     
          </xsl:when> 
          <xsl:when test="CodeId = 'mkm_c_druh_zak'">    
            <AUART><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></AUART>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when>  
          <xsl:when test="CodeId = 'mkm_c_dvu_fcni_trida'">    
            <ILART><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></ILART>
            <FCNI_TRIDA><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></FCNI_TRIDA>
          </xsl:when>
          <xsl:when test="CodeId = 'mkm_c_priorita'">    
            <PRIOK><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></PRIOK>
            <TXT><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></TXT>
          </xsl:when> 
          <xsl:when test="CodeId = 'mkm_c_uroven_site'">    
            <SPEBENE><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></SPEBENE>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when>  
          <xsl:when test="CodeId = 'mkm_c_det_umist'">    
            <LOCATION><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></LOCATION>
            <TXT><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></TXT>
          </xsl:when>
          <xsl:when test="CodeId = 'mkm_c_pristupnost'">    
            <ACCESS><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></ACCESS>
            <TXT><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></TXT>
          </xsl:when>
          <xsl:when test="CodeId = 'mkm_c_patro'">    
            <FLOOR><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></FLOOR>
            <TXT><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></TXT>
          </xsl:when>
          <xsl:when test="CodeId = 'mkm_c_signal_gsm'">    
            <SIGNAL><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></SIGNAL>
            <TXT><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></TXT>
          </xsl:when>
          <xsl:when test="CodeId = 'mkm_c_druh_om'">    
            <ANLART><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></ANLART>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when>      
          <xsl:when test="CodeId = 'mkm_c_typ_pristroje'">    
            <SPARTYP><xsl:value-of select="following-sibling::CodeList[33]/CodeValue" /></SPARTYP>
            <FUNKLAS><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></FUNKLAS>
            <BAUKLAS><xsl:value-of select="following-sibling::CodeList[4]/CodeValue" /></BAUKLAS>            
            <BAUFORM><xsl:value-of select="following-sibling::CodeList[5]/CodeValue" /></BAUFORM>
            <MATNR><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></MATNR>
          </xsl:when>     
          <xsl:when test="CodeId = 'mkm_c_konfigurace'">    
            <EQFNR><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></EQFNR>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when>  
          <xsl:when test="CodeId = 'mkm_c_skup_registru'">    
            <SPARTYP><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></SPARTYP>
            <ZWGRUPPE><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></ZWGRUPPE>
            <TXT><xsl:value-of select="following-sibling::CodeList[5]/CodeValue" /></TXT>
          </xsl:when>
          <xsl:when test="CodeId = 'mkm_c_povel'">    
            <PROGT><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></PROGT>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when>
          <xsl:when test="CodeId = 'mkm_c_hdo_povel'">    
            <MATNR><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></MATNR>
            <PROGT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></PROGT>
          </xsl:when>
          <xsl:when test="CodeId = 'mkm_c_zpusob_odectu'">    
            <INTSEAL><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></INTSEAL>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when> 
          <xsl:when test="CodeId = 'mkm_c_workflow'">    
            <WORKFLOW><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></WORKFLOW>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when>
          <xsl:when test="CodeId = 'mkm_c_duvod_neusp'">    
            <DUVOD_NEUSP><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></DUVOD_NEUSP>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when>
          <xsl:when test="CodeId = 'mkm_c_zjis_na_om1'">    
            <ZJIS_NA_OM1><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></ZJIS_NA_OM1>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
            <XKLZ><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></XKLZ>            
            <POCET_UROVNI><xsl:value-of select="following-sibling::CodeList[4]/CodeValue" /></POCET_UROVNI>
            <XPOVIN_POZN><xsl:value-of select="following-sibling::CodeList[5]/CodeValue" /></XPOVIN_POZN>
            <WORKFLOW><xsl:value-of select="following-sibling::CodeList[6]/CodeValue" /></WORKFLOW>            
          </xsl:when> 
          <xsl:when test="CodeId = 'mkm_c_zjis_na_om2'">    
            <ZJIS_NA_OM1><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></ZJIS_NA_OM1>
            <ZJIS_NA_OM2><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></ZJIS_NA_OM2>
            <TXT><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></TXT>            
            <XPOVIN_POZN><xsl:value-of select="following-sibling::CodeList[4]/CodeValue" /></XPOVIN_POZN>
            <WORKFLOW><xsl:value-of select="following-sibling::CodeList[5]/CodeValue" /></WORKFLOW>           
          </xsl:when> 
          <xsl:when test="CodeId = 'mkm_c_zjis_na_om3'">    
            <ZJIS_NA_OM1><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></ZJIS_NA_OM1>
            <ZJIS_NA_OM2><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></ZJIS_NA_OM2>
            <ZJIS_NA_OM3><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></ZJIS_NA_OM3>            
            <TXT><xsl:value-of select="following-sibling::CodeList[4]/CodeValue" /></TXT>
            <XPOVIN_POZN><xsl:value-of select="following-sibling::CodeList[5]/CodeValue" /></XPOVIN_POZN>
            <WORKFLOW><xsl:value-of select="following-sibling::CodeList[6]/CodeValue" /></WORKFLOW>            
          </xsl:when> 
          <xsl:when test="CodeId = 'mkm_c_klz1'">    
            <KLZ1><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></KLZ1>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when>
          <xsl:when test="CodeId = 'mkm_c_klz2'">    
            <KLZ1><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></KLZ1>
            <KLZ2><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></KLZ2>
            <TXT><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></TXT>            
            <XPOVIN_POZN><xsl:value-of select="following-sibling::CodeList[4]/CodeValue" /></XPOVIN_POZN>
            <XREVIZE><xsl:value-of select="following-sibling::CodeList[5]/CodeValue" /></XREVIZE>           
          </xsl:when>
          <xsl:when test="CodeId = 'mkm_c_druh_prilohy'">    
            <DRUH_PRILOHY><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></DRUH_PRILOHY>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
            <TYP_PRILOHY><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></TYP_PRILOHY>                      
          </xsl:when> 
          <xsl:when test="CodeId = 'mkm_c_typ_mereni'">    
            <EUSTYPM><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></EUSTYPM>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when>    
          <xsl:when test="CodeId = 'mkm_c_pocet_fazi'">    
            <POCET_FAZI><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></POCET_FAZI>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when> 
          <xsl:when test="CodeId = 'mkm_c_nasobitel'">    
            <KOD><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></KOD>
            <ABRFAKT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></ABRFAKT>
          </xsl:when> 
          <xsl:when test="CodeId = 'mkm_c_status_sz'">    
            <SZ_STATUS><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></SZ_STATUS>
            <TXT><xsl:value-of select="following-sibling::CodeList[4]/CodeValue" /></TXT>
          </xsl:when>
          <xsl:when test="CodeId = 'mkm_c_status_pp'">    
            <PP_STATUS><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></PP_STATUS>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when>  
          <xsl:when test="CodeId = 'mkm_c_status_zd'">    
            <ZD_STATUS><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></ZD_STATUS>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when> 
          <xsl:when test="CodeId = 'mkm_c_status_tpm'">    
            <TPM_STATUS><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></TPM_STATUS>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when>
         <xsl:when test="CodeId = 'mkm_c_vysledek'">    
            <VYSLEDEK><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></VYSLEDEK>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when>  
         <xsl:when test="CodeId = 'mkm_c_log_akce'">    
            <LOG_AKCE><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></LOG_AKCE>
            <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
          </xsl:when> 
          <xsl:when test="CodeId = 'mkm_c_uzivatel'">    
            <KID><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></KID>
            <JMENO><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></JMENO>
            <PRIJMENI><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></PRIJMENI>            
            <PLATNOST_OD><xsl:value-of select="following-sibling::CodeList[4]/CodeValue" /></PLATNOST_OD>  
            <PLATNOST_DO><xsl:value-of select="following-sibling::CodeList[5]/CodeValue" /></PLATNOST_DO>
            <HESLO><xsl:value-of select="following-sibling::CodeList[6]/CodeValue" /></HESLO>
            <HESLO_DATUM><xsl:value-of select="following-sibling::CodeList[7]/CodeValue" /></HESLO_DATUM>            
            <HESLO_INIC><xsl:value-of select="following-sibling::CodeList[8]/CodeValue" /></HESLO_INIC>
            <HESLO_PLATNOST_DO><xsl:value-of select="following-sibling::CodeList[8]/CodeValue" /></HESLO_PLATNOST_DO>                                  
          </xsl:when>
          <xsl:when test="CodeId = 'mkm_c_uziv_prac'">    
            <KID><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></KID>
            <WERKS><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></WERKS>
            <ARBPL><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></ARBPL>                     
          </xsl:when> 
          <xsl:when test="CodeId = 'mkm_c_role'">    
            <ROLE><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></ROLE>
            <NAZEV><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></NAZEV>                     
          </xsl:when> 
          <xsl:when test="CodeId = 'mkm_c_uziv_role'">    
            <KID><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></KID>
            <ROLE><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></ROLE>                     
          </xsl:when>                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
        </xsl:choose>
      </xsl:element>
    </xsl:template>

<xsl:template match="CodeList[CodeName != 'MANDT']">
  <xsl:variable name="cListName" select="CodeId" />

  <xsl:if test="CodeId = 'mkm_c_druh_zak'">
    <xsl:if test="CodeName = 'CLIENT'">
      <xsl:element name="{$cListName}" >  
          <AUART><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></AUART>
          <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
      </xsl:element> 
    </xsl:if>
  </xsl:if>

  <xsl:if test="CodeId = 'mkm_c_pracoviste'">
    <xsl:if test="CodeName = 'WERKS'">
      <xsl:element name="{$cListName}" >  
        <WERKS><xsl:value-of select="CodeValue" /></WERKS>
        <ARBPL><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></ARBPL>
        <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
        <VERAN><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></VERAN>
        <QUALF><xsl:value-of select="following-sibling::CodeList[4]/CodeValue" /></QUALF>
      </xsl:element> 
    </xsl:if>
  </xsl:if>    

  <xsl:if test="CodeId = 'mkm_c_sazba'">
    <xsl:if test="CodeName = 'SPARTE'">
      <xsl:element name="{$cListName}" >  
        <SPARTYP><xsl:value-of select="CodeValue" /></SPARTYP>
        <TARIFTYP><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></TARIFTYP>
      </xsl:element> 
    </xsl:if>
  </xsl:if>

  <xsl:if test="CodeId = 'mkm_c_fcni_trida'">
    <xsl:if test="CodeName = 'SPARTYP'">
      <xsl:element name="{$cListName}" >  
        <SPARTYP><xsl:value-of select="CodeValue" /></SPARTYP>
        <FUNKLAS><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></FUNKLAS>
        <TXT><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></TXT>
      </xsl:element> 
    </xsl:if>
  </xsl:if>

  <xsl:if test="CodeId = 'mkm_c_konstr_trida'">
    <xsl:if test="CodeName = 'SPARTYP'">
      <xsl:element name="{$cListName}" >  
        <SPARTYP><xsl:value-of select="CodeValue" /></SPARTYP>
        <FUNKLAS><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></FUNKLAS>
        <BAUKLAS><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></BAUKLAS>            
        <TXT><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></TXT>
      </xsl:element> 
    </xsl:if>
  </xsl:if>

  <xsl:if test="CodeId = 'mkm_c_kontejner'">
    <xsl:if test="CodeName = 'TPLNR'">
      <xsl:element name="{$cListName}" >  
            <TPLNR><xsl:value-of select="CodeValue" /></TPLNR>
            <NAZEV><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></NAZEV>
            <WERKS><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></WERKS>            
            <STORT><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></STORT>  
      </xsl:element> 
    </xsl:if>
  </xsl:if>

  <xsl:if test="CodeId = 'mkm_c_duvod_prerus'">
    <xsl:if test="CodeName = 'ORDSTATE'">
      <xsl:element name="{$cListName}" >  
            <DISCREASON><xsl:value-of select="CodeValue" /></DISCREASON>
            <TXT><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></TXT>
            <AUART><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></AUART>            
            <STATUS><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></STATUS>  
      </xsl:element> 
    </xsl:if>
  </xsl:if>

  <xsl:if test="CodeId = 'mkm_c_dvu'">
    <xsl:if test="CodeName = 'AUART'">
      <xsl:element name="{$cListName}" >  
            <AUART><xsl:value-of select="CodeValue" /></AUART>
            <ILART><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></ILART>
            <ILATX><xsl:value-of select="following-sibling::CodeList[2]/CodeValue" /></ILATX>
            <XMKM_ZPRAC><xsl:value-of select="following-sibling::CodeList[3]/CodeValue" /></XMKM_ZPRAC>
            <XSTDM><xsl:value-of select="following-sibling::CodeList[4]/CodeValue" /></XSTDM>
            <XSPECM><xsl:value-of select="following-sibling::CodeList[5]/CodeValue" /></XSPECM>   
            <SKUPINA><xsl:value-of select="following-sibling::CodeList[6]/CodeValue" /></SKUPINA>
            <XAUTOM_ZPRAC_SZ><xsl:value-of select="following-sibling::CodeList[7]/CodeValue" /></XAUTOM_ZPRAC_SZ>   
      </xsl:element> 
    </xsl:if>
  </xsl:if>

  <xsl:if test="CodeId = 'mkm_c_char_jistice'">
    <xsl:if test="CodeName = 'ID'">
      <xsl:element name="{$cListName}" >  
            <CHAR_JISTICE><xsl:value-of select="CodeValue" /></CHAR_JISTICE>
            <TXT><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></TXT>  
      </xsl:element> 
    </xsl:if>
  </xsl:if>

  <xsl:if test="CodeId = 'mkm_c_typ_jist_prv'">
    <xsl:if test="CodeName = 'ID'">
      <xsl:element name="{$cListName}" >  
            <TYP_JIST_PRV><xsl:value-of select="CodeValue" /></TYP_JIST_PRV>
            <TXT><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></TXT> 
      </xsl:element> 
    </xsl:if>
  </xsl:if>  

  <xsl:if test="CodeId = 'mkm_c_operator'">
    <xsl:if test="CodeName = 'ID'">
      <xsl:element name="{$cListName}" >  
            <OPERATOR><xsl:value-of select="CodeValue" /></OPERATOR>
            <TXT><xsl:value-of select="following-sibling::CodeList[1]/CodeValue" /></TXT>
      </xsl:element> 
    </xsl:if>
  </xsl:if>   
   
</xsl:template>

</xsl:stylesheet>