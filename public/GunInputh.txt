#pragma once


#include "GPPlayerController.h"
#include "GunInput.generated.h"

class UCameraComponent;
class UInputComponent;
class GPPlayerController;
class USceneComponent;
class USkeletalMeshComponent;
class UAnimMontage;
class USoundBase;
class UNiagaraSystem;
class UNiagaraComponent;

UCLASS(Meta = (BlueprintSpawnableComponent))
class GP3_UPROJECT_API UGunInput : public UActorComponent
{
	GENERATED_BODY()
	
public:
	

	/** Gun mesh: 1st person view (seen only by self) */
	//UPROPERTY(EditAnywhere, Category = Mesh)
		//USkeletalMeshComponent* FP_Gun;
	/** Location on gun mesh where projectiles should spawn. */
	UPROPERTY(VisibleDefaultsOnly, Category = Mesh)
		USceneComponent* FP_MuzzleLocation;
	/** Gun muzzle's offset from the characters location */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Gameplay)
		FVector GunOffset;
	/** Sound to play each time we fire */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Gameplay)
		USoundBase* FireSound;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Gameplay)
		bool Autofire;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Gameplay)
		float TimeBetweenShots;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Gameplay)
		class UNiagaraSystem* ImpactParticles;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Gameplay) 
		class UNiagaraSystem* MuzzleParticles;

public:
	UGunInput();
	UFUNCTION(BlueprintCallable)
	void StartFire();
	UFUNCTION(BlueprintCallable)
	void StopFire();
	void FireShot();
	FTimerHandle TimerHandle;
	bool Cooldown;
	float GunCooldown;
	void TimerElapsed();
	float LastShotTime;
	int Magazine=5;
	UPROPERTY(BlueprintReadOnly)
	FVector StartTrace;
	UPROPERTY(BlueprintReadOnly)
		FVector EndTrace;

	UFUNCTION(BlueprintNativeEvent)
		void SpawnVFX(FVector a, FVector b, FVector HitLocation);




	virtual void SetupPlayerInputComponent(UInputComponent* InputComponent);
	/** Returns Mesh1P subobject **/
//	USkeletalMeshComponent* GetMesh1P() const { return Mesh1P; }
protected:


private:
	virtual void BeginPlay();

	UPROPERTY()
	AGPPlayerController* Owner;
};
